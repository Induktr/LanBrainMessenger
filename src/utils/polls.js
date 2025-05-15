import { supabase } from './supabase';
import { pollData } from '../data/polls';

// UUID validation regex - only allows hexadecimal characters (0-9, a-f)
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function isValidUUID(uuid) {
  if (!uuid || typeof uuid !== 'string') {
    console.error('Invalid UUID input:', { uuid, type: typeof uuid });
    return false;
  }
  
  const trimmedUUID = uuid.trim();
  const isValid = UUID_REGEX.test(trimmedUUID);
  
  if (!isValid) {
    console.error('UUID validation failed:', {
      uuid: trimmedUUID,
      length: trimmedUUID.length,
      format: 'Expected format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx (where x is 0-9 or a-f)'
    });
  }
  
  return isValid;
}

// Function to verify if a poll exists in the database
async function verifyPollExists(pollId) {
  try {
    const { data, error } = await supabase
      .from('polls')
      .select('id')
      .eq('id', pollId)
      .maybeSingle();

    if (error) {
      console.error('Error verifying poll:', error);
      return false;
    }

    return !!data;
  } catch (error) {
    console.error('Error checking poll existence:', error);
    return false;
  }
}

// Function to sync a single poll to Supabase
async function syncPollToSupabase(poll) {
  try {
    // First check if we have write access
    const { error: testError } = await supabase
      .from('polls')
      .select('id')
      .limit(1);

    if (testError?.code === '42501') {
      throw new Error('You do not have permission to modify polls. Please contact an administrator.');
    }

    const { error } = await supabase
      .from('polls')
      .upsert({
        id: poll.id,
        title: poll.title,
        description: poll.description,
        end_date: poll.endDate,
        created_by: supabase.auth.user()?.id
      });

    if (error) {
      if (error.code === '42501') {
        throw new Error('Permission denied: Cannot modify polls. Please contact an administrator.');
      }
      console.error('Error syncing poll:', error);
      return false;
    }

    // Sync poll options with proper error handling
    for (const option of poll.options) {
      const { error: optionError } = await supabase
        .from('poll_options')
        .upsert({
          id: option.id,
          poll_id: poll.id,
          title: option.title,
          description: option.description,
          votes: option.votes || 0,
          winner: option.winner || false,
          created_by: supabase.auth.user()?.id
        });

      if (optionError) {
        if (optionError.code === '42501') {
          throw new Error('Permission denied: Cannot modify poll options. Please contact an administrator.');
        }
        console.error('Error syncing poll option:', optionError);
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('Error in syncPollToSupabase:', error);
    throw error;
  }
}

// Function to sync all polls from pollData
export async function syncPolls() {
  try {
    console.log('Starting poll synchronization...');
    const allPolls = [...pollData.activePolls];
    
    // Check if we have necessary permissions first
    const { error: permissionError } = await supabase
      .from('polls')
      .select('id')
      .limit(1);

    if (permissionError?.code === '42501') {
      throw new Error('You do not have permission to access polls. Please contact an administrator.');
    }
    
    const results = [];
    for (const poll of allPolls) {
      const exists = await verifyPollExists(poll.id);
      if (!exists) {
        console.log(`Syncing poll ${poll.id} to database...`);
        try {
          const success = await syncPollToSupabase(poll);
          results.push({ id: poll.id, success });
        } catch (error) {
          results.push({ id: poll.id, success: false, error: error.message });
        }
      }
    }
    
    const failedPolls = results.filter(r => !r.success);
    if (failedPolls.length > 0) {
      console.error('Some polls failed to sync:', failedPolls);
    }
    
    console.log('Poll synchronization completed');
    return results;
  } catch (error) {
    console.error('Error syncing polls:', error);
    throw error;
  }
}

// Add debug function to check poll option details
const debugPollOption = async (pollId, optionId) => {
  console.log('Debugging poll option:', { pollId, optionId });

  // Check poll details
  const { data: poll } = await supabase
    .from('polls')
    .select('*')
    .eq('id', pollId)
    .maybeSingle();
  
  console.log('Poll details:', poll);

  // Check option details
  const { data: option } = await supabase
    .from('poll_options')
    .select('*')
    .eq('id', optionId)
    .maybeSingle();
  
  console.log('Option details:', option);

  // Check all options for this poll
  const { data: allOptions } = await supabase
    .from('poll_options')
    .select('*')
    .eq('poll_id', pollId);
  
  console.log('All poll options:', allOptions);

  return {
    poll,
    option,
    allOptions
  };
};

export const validatePollOption = async (pollId, optionId) => {
  console.log('Validating poll option:', { pollId, optionId });

  try {
    // First get the poll details
    const { data: pollData, error: pollError } = await supabase
      .from('polls')
      .select('id, title')
      .eq('id', pollId)
      .single();

    if (pollError) {
      console.error('Error fetching poll:', pollError);
      throw new Error(`Failed to validate poll: ${pollError.message}`);
    }

    if (!pollData) {
      console.error('Poll not found:', pollId);
      throw new Error('Poll not found');
    }

    // Then get the option details in a separate query
    const { data: optionData, error: optionError } = await supabase
      .from('poll_options')
      .select('id, title, poll_id')
      .eq('id', optionId)
      .eq('poll_id', pollId)
      .single();

    if (optionError) {
      console.error('Error fetching option:', optionError);
      // Get all available options for better error message
      const { data: allOptions } = await supabase
        .from('poll_options')
        .select('id, title')
        .eq('poll_id', pollId);

      throw new Error(`Option not found. Available options: ${
        allOptions?.map(o => o.title).join(', ') || 'none'
      }`);
    }

    if (!optionData) {
      console.error('Option not found or does not belong to poll:', {
        pollId,
        optionId
      });
      throw new Error('Invalid option for this poll');
    }

    console.log('Poll option validated successfully:', {
      pollId,
      pollTitle: pollData.title,
      optionId,
      optionTitle: optionData.title
    });

    return true;
  } catch (error) {
    console.error('Validation error:', error);
    throw error;
  }
};

export const submitVote = async (pollId, optionId, userId) => {
  console.log('Attempting to submit vote:', { pollId, optionId, userId });

  try {
    // First validate the poll and option
    await validatePollOption(pollId, optionId);

    // Check for existing vote
    const { data: existingVote, error: checkError } = await supabase
      .from('poll_votes')
      .select('*')
      .eq('poll_id', pollId)
      .eq('user_id', userId)
      .maybeSingle();

    if (checkError) {
      console.error('Error checking existing vote:', checkError);
      throw new Error('Failed to check existing vote');
    }

    if (existingVote) {
      console.log('User already voted:', existingVote);
      throw new Error('You have already voted on this poll');
    }

    // Submit the vote
    const { data, error: submitError } = await supabase
      .from('poll_votes')
      .insert([
        {
          poll_id: pollId,
          option_id: optionId,
          user_id: userId,
          created_at: new Date().toISOString()
        }
      ])
      .select();

    if (submitError) {
      console.error('Error submitting vote:', submitError);
      throw new Error(`Failed to submit vote: ${submitError.message}`);
    }

    console.log('Vote submitted successfully:', data);
    return { data, error: null };
  } catch (error) {
    console.error('Error in submitVote:', error);
    return { data: null, error };
  }
};

export const getPollResults = async (pollId) => {
  try {
    // Get poll details
    const { data: pollData, error: pollError } = await supabase
      .from('polls')
      .select('id, title')
      .eq('id', pollId)
      .single();

    if (pollError) throw pollError;

    // Get options with vote counts
    const { data: optionsData, error: optionsError } = await supabase
      .from('poll_options')
      .select(`
        id,
        title,
        poll_votes (count)
      `)
      .eq('poll_id', pollId);

    if (optionsError) throw optionsError;

    // Format results
    const results = {};
    optionsData.forEach(option => {
      results[option.id] = option.poll_votes?.length || 0;
    });

    return {
      results,
      pollTitle: pollData.title,
      options: optionsData.map(({ id, title }) => ({ id, title })),
      error: null
    };
  } catch (error) {
    console.error('Error getting poll results:', error);
    return { results: null, error };
  }
};

export async function getUserVotes(userId) {
  if (!userId || !isValidUUID(userId)) {
    console.error('Invalid user ID format');
    return {};
  }
  
  try {
    const { data, error } = await supabase
      .from('poll_votes')
      .select('poll_id, option_id')
      .eq('user_id', userId);

    if (error) throw error;

    // Convert array to object for easier lookup
    return data.reduce((acc, vote) => {
      acc[vote.poll_id] = vote.option_id;
      return acc;
    }, {});
  } catch (error) {
    console.error('Error fetching user votes:', error);
    return {};
  }
}
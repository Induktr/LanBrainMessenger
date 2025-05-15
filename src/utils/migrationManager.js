import { supabase } from '../config/supabase';
import crypto from 'crypto';

class MigrationManager {
  constructor() {
    this.supabase = supabase;
  }

  /**
   * Compute checksum for migration content
   * @param {string} content Migration SQL content
   * @returns {string} Checksum
   */
  computeChecksum(content) {
    return crypto
      .createHash('sha256')
      .update(content)
      .digest('hex');
  }

  /**
   * Track a new migration
   * @param {Object} params Migration parameters
   * @returns {Promise<Object>} Migration result
   */
  async trackMigration({ version, name, description, content, rollbackScript }) {
    try {
      const checksum = this.computeChecksum(content);

      const { data, error } = await this.supabase
        .rpc('track_migration', {
          p_version: version,
          p_name: name,
          p_description: description,
          p_checksum: checksum,
          p_rollback_script: rollbackScript
        });

      if (error) throw error;
      return { success: true, migrationId: data };
    } catch (error) {
      console.error('Failed to track migration:', error);
      return { success: false, error };
    }
  }

  /**
   * Get migration status
   * @returns {Promise<Array>} List of migrations and their status
   */
  async getMigrationStatus() {
    try {
      const { data, error } = await this.supabase
        .from('migration_status')
        .select('*')
        .order('version');

      if (error) throw error;
      return { success: true, migrations: data };
    } catch (error) {
      console.error('Failed to get migration status:', error);
      return { success: false, error };
    }
  }

  /**
   * Verify migration integrity
   * @returns {Promise<Array>} List of migration issues
   */
  async verifyIntegrity() {
    try {
      const { data, error } = await this.supabase
        .rpc('verify_migration_integrity');

      if (error) throw error;
      return { success: true, issues: data };
    } catch (error) {
      console.error('Failed to verify migration integrity:', error);
      return { success: false, error };
    }
  }

  /**
   * Log migration error
   * @param {string} version Migration version
   * @param {Error} error Error object
   */
  async logMigrationError(version, error) {
    try {
      const { data, error: updateError } = await this.supabase
        .from('private.migration_versions')
        .update({
          success: false,
          error_message: error.message,
          updated_at: new Date().toISOString()
        })
        .eq('version', version);

      if (updateError) throw updateError;
      return { success: true };
    } catch (updateError) {
      console.error('Failed to log migration error:', updateError);
      return { success: false, error: updateError };
    }
  }
}

export const migrationManager = new MigrationManager();
export default migrationManager;

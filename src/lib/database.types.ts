export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// Define the trigger type
type Trigger = {
  name: string
  event: string
  table: string
  function: string
}

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          wallet_address: string | null
          is_verified: boolean
          verification_token: string | null
          verification_expires_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          wallet_address?: string | null
          is_verified?: boolean
          verification_token?: string | null
          verification_expires_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          wallet_address?: string | null
          is_verified?: boolean
          verification_token?: string | null
          verification_expires_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      ubi_distributions: {
        Row: {
          id: string
          user_id: string
          amount: number
          transaction_hash: string | null
          chain_id: number
          status: 'pending' | 'completed' | 'failed'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          amount: number
          transaction_hash?: string | null
          chain_id: number
          status: 'pending' | 'completed' | 'failed'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          amount?: number
          transaction_hash?: string | null
          chain_id?: number
          status?: 'pending' | 'completed' | 'failed'
          created_at?: string
          updated_at?: string
        }
      }
      verification_attempts: {
        Row: {
          id: string
          user_id: string
          email: string
          ip_address: string | null
          status: 'pending' | 'verified' | 'failed'
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          email: string
          ip_address?: string | null
          status: 'pending' | 'verified' | 'failed'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          email?: string
          ip_address?: string | null
          status?: 'pending' | 'verified' | 'failed'
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      update_updated_at_column: {
        Args: Record<PropertyKey, never>
        Returns: Trigger
      }
      handle_new_user: {
        Args: Record<PropertyKey, never>
        Returns: Trigger
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
} 
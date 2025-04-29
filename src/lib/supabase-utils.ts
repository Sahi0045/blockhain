import { supabase } from './supabase';
import { Database } from './database.types';

// Auth Utilities
export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// User Utilities
export async function updateUserWallet(walletAddress: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('No authenticated user');

  const { data, error } = await supabase
    .from('users')
    .update({ wallet_address: walletAddress })
    .eq('id', user.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// UBI Distribution Utilities
export async function createUBIDistribution(
  userId: string,
  amount: number,
  chainId: number,
  transactionHash: string
) {
  const { data, error } = await supabase
    .from('ubi_distributions')
    .insert({
      user_id: userId,
      amount,
      chain_id: chainId,
      transaction_hash: transactionHash,
      status: 'pending',
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateUBIDistributionStatus(
  distributionId: string,
  status: 'completed' | 'failed'
) {
  const { data, error } = await supabase
    .from('ubi_distributions')
    .update({ status })
    .eq('id', distributionId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Verification Utilities
export async function createVerificationAttempt(
  userId: string,
  email: string,
  ipAddress?: string
) {
  const { data, error } = await supabase
    .from('verification_attempts')
    .insert({
      user_id: userId,
      email,
      ip_address: ipAddress,
      status: 'pending',
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateVerificationStatus(
  attemptId: string,
  status: 'verified' | 'failed'
) {
  const { data, error } = await supabase
    .from('verification_attempts')
    .update({ status })
    .eq('id', attemptId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Query Utilities
export async function getUserUBIDistributions(userId: string) {
  const { data, error } = await supabase
    .from('ubi_distributions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getUserVerificationStatus(userId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('is_verified')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data.is_verified;
} 
import { supabase } from "@/lib/supabaseClient";

export interface Profile {
  id: string;
  full_name?: string;
  avatar_url?: string;
  updated_at?: string;
}

export const fetchProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, avatar_url, updated_at")
    .eq("id", userId)
    .maybeSingle();

  if (error) throw error;
  return data;
};

export const upsertProfile = async (payload: Profile) => {
  const { data, error } = await supabase.from("profiles").upsert(payload).select().maybeSingle();
  if (error) throw error;
  return data;
};

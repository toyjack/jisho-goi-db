import { createClient } from "@/lib/supabase/server"
import { Database } from "@/lib/supabase/type"

export async function getTsjWakun(tsjWakunId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('tsj_wakun')
    .select()
    .eq('sj_w_id', tsjWakunId)
    .single()

  return { data, error }
}

export async function searchTsjWakun(terms: Partial<Database["public"]["Tables"]["tsj_wakun"]["Row"]>) {
  const supabase = await createClient()
  let query = supabase.from('tsj_wakun').select()

  for (const [key, value] of Object.entries(terms)) {
    if (value !== undefined && value !== null && value !== '') {
      query = query.ilike(key, `%${value}%`)
    }
  }

  const { data, error } = await query

  return { data, error }
}
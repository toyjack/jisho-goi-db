export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      jyobatsu_records: {
        Row: {
          ID: string
          URL: string | null
          データ作成日: string | null
          作成者: string | null
          備考: string | null
          "出版年（和暦）": string | null
          "出版年（西暦）": string | null
          "出版社・出版人・印刷所": string | null
          同一ID内順序: number | null
          左右: string | null
          序跋名称: string | null
          所在表示: string | null
          "整理番号（国会図書館）": string | null
          文献ID: number | null
          書名: string | null
          本文: string | null
          本文文字種: string | null
          編者: string | null
          行: number | null
        }
        Insert: {
          ID: string
          URL?: string | null
          データ作成日?: string | null
          作成者?: string | null
          備考?: string | null
          "出版年（和暦）"?: string | null
          "出版年（西暦）"?: string | null
          "出版社・出版人・印刷所"?: string | null
          同一ID内順序?: number | null
          左右?: string | null
          序跋名称?: string | null
          所在表示?: string | null
          "整理番号（国会図書館）"?: string | null
          文献ID?: number | null
          書名?: string | null
          本文?: string | null
          本文文字種?: string | null
          編者?: string | null
          行?: number | null
        }
        Update: {
          ID?: string
          URL?: string | null
          データ作成日?: string | null
          作成者?: string | null
          備考?: string | null
          "出版年（和暦）"?: string | null
          "出版年（西暦）"?: string | null
          "出版社・出版人・印刷所"?: string | null
          同一ID内順序?: number | null
          左右?: string | null
          序跋名称?: string | null
          所在表示?: string | null
          "整理番号（国会図書館）"?: string | null
          文献ID?: number | null
          書名?: string | null
          本文?: string | null
          本文文字種?: string | null
          編者?: string | null
          行?: number | null
        }
        Relationships: []
      }
      kanseki_records: {
        Row: {
          bibliographic: Json | null
          category: string | null
          children: string[]
          classification: Json | null
          created_at: string | null
          creators: string[]
          holdings: Json | null
          id: string
          nu: string
          organization_code: string
          publish_year: string[]
          publisher: string[]
          raw_data: Json | null
          relations: Json | null
          source_file: string | null
          subcategory: string | null
          title: string[]
          updated_at: string | null
        }
        Insert: {
          bibliographic?: Json | null
          category?: string | null
          children?: string[]
          classification?: Json | null
          created_at?: string | null
          creators?: string[]
          holdings?: Json | null
          id?: string
          nu: string
          organization_code: string
          publish_year?: string[]
          publisher?: string[]
          raw_data?: Json | null
          relations?: Json | null
          source_file?: string | null
          subcategory?: string | null
          title?: string[]
          updated_at?: string | null
        }
        Update: {
          bibliographic?: Json | null
          category?: string | null
          children?: string[]
          classification?: Json | null
          created_at?: string | null
          creators?: string[]
          holdings?: Json | null
          id?: string
          nu?: string
          organization_code?: string
          publish_year?: string[]
          publisher?: string[]
          raw_data?: Json | null
          relations?: Json | null
          source_file?: string | null
          subcategory?: string | null
          title?: string[]
          updated_at?: string | null
        }
        Relationships: []
      }
      tsj_wakun: {
        Row: {
          def_manyogana: string | null
          entry_text: string | null
          entry_type: string | null
          kyowa_entry_text: string | null
          kyowa_loc: string | null
          kyowa_manyogana: string | null
          nikkoku_example_check: string | null
          nikkoku_id: string | null
          reading_historical_kana: string | null
          reading_kana_kanji: string | null
          remarks: string | null
          rinsen_loc: string | null
          sj_w_id: string
          tsj_id: string | null
          zhang_page: string | null
        }
        Insert: {
          def_manyogana?: string | null
          entry_text?: string | null
          entry_type?: string | null
          kyowa_entry_text?: string | null
          kyowa_loc?: string | null
          kyowa_manyogana?: string | null
          nikkoku_example_check?: string | null
          nikkoku_id?: string | null
          reading_historical_kana?: string | null
          reading_kana_kanji?: string | null
          remarks?: string | null
          rinsen_loc?: string | null
          sj_w_id: string
          tsj_id?: string | null
          zhang_page?: string | null
        }
        Update: {
          def_manyogana?: string | null
          entry_text?: string | null
          entry_type?: string | null
          kyowa_entry_text?: string | null
          kyowa_loc?: string | null
          kyowa_manyogana?: string | null
          nikkoku_example_check?: string | null
          nikkoku_id?: string | null
          reading_historical_kana?: string | null
          reading_kana_kanji?: string | null
          remarks?: string | null
          rinsen_loc?: string | null
          sj_w_id?: string
          tsj_id?: string | null
          zhang_page?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      search_kanseki_records: {
        Args: {
          p_creator?: string
          p_organization_code?: string
          p_publish_year?: string
          p_publisher?: string
          p_title?: string
        }
        Returns: {
          category: string
          creators: string[]
          id: string
          nu: string
          organization_code: string
          publish_year: string[]
          publisher: string[]
          subcategory: string
          title: string[]
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const


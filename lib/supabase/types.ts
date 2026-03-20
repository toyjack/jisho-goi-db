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
      dhsjr: {
        Row: {
          ID: string
          その他: string | null
          仮名型: string | null
          仮名注: string | null
          備考: string | null
          出現位置: string | null
          単字_出現形: string | null
          単字_見出し: string | null
          単字長: string | null
          反切: string | null
          声点: string | null
          声点型: string | null
          漢語_alphabet: string | null
          漢語_出現形: string | null
          漢語_見出し: string | null
          漢語内位置: string | null
          節博士: string | null
          語種: string | null
          資料内漢字番号: number
          資料内漢語番号: string | null
          資料名: string | null
          資料番号: string | null
          類音: string | null
        }
        Insert: {
          ID: string
          その他?: string | null
          仮名型?: string | null
          仮名注?: string | null
          備考?: string | null
          出現位置?: string | null
          単字_出現形?: string | null
          単字_見出し?: string | null
          単字長?: string | null
          反切?: string | null
          声点?: string | null
          声点型?: string | null
          漢語_alphabet?: string | null
          漢語_出現形?: string | null
          漢語_見出し?: string | null
          漢語内位置?: string | null
          節博士?: string | null
          語種?: string | null
          資料内漢字番号: number
          資料内漢語番号?: string | null
          資料名?: string | null
          資料番号?: string | null
          類音?: string | null
        }
        Update: {
          ID?: string
          その他?: string | null
          仮名型?: string | null
          仮名注?: string | null
          備考?: string | null
          出現位置?: string | null
          単字_出現形?: string | null
          単字_見出し?: string | null
          単字長?: string | null
          反切?: string | null
          声点?: string | null
          声点型?: string | null
          漢語_alphabet?: string | null
          漢語_出現形?: string | null
          漢語_見出し?: string | null
          漢語内位置?: string | null
          節博士?: string | null
          語種?: string | null
          資料内漢字番号?: number
          資料内漢語番号?: string | null
          資料名?: string | null
          資料番号?: string | null
          類音?: string | null
        }
        Relationships: []
      }
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
      normalizations: {
        Row: {
          normalized: string | null
          target: string | null
        }
        Insert: {
          normalized?: string | null
          target?: string | null
        }
        Update: {
          normalized?: string | null
          target?: string | null
        }
        Relationships: []
      }
      racvyoxv_shogyokuhen: {
        Row: {
          "２字目": string | null
          "3字目": string | null
          "4字目": string | null
          "5字目": string | null
          ID: string
          "ページ数（笠間書院総索引／天理図書館善本叢": number | null
          代表字: string | null
          代表字頭記号: string | null
          備考: string | null
          国書DB所在: string | null
          文字数: string | null
          行数: number | null
          見出し語: string | null
          "訓読み(左傍1字目)": string | null
          "訓読み(左傍1字目補完)": string | null
          "訓読み(左傍2字目)": string | null
          "訓読み(左傍3字目)": string | null
          "訓読み(左傍4字目)": string | null
          "訓読み(左傍5字目)": string | null
          "語形（音読み）": string | null
          部: string | null
          "音読み(右傍1字目)": string | null
          "音読み(右傍1字目補完)": string | null
          "音読み(右傍2字目)": string | null
          "音読み(右傍3字目)": string | null
          "音読み(右傍4字目)": string | null
          "音読み(右傍5字目)": string | null
        }
        Insert: {
          "２字目"?: string | null
          "3字目"?: string | null
          "4字目"?: string | null
          "5字目"?: string | null
          ID: string
          "ページ数（笠間書院総索引／天理図書館善本叢"?: number | null
          代表字?: string | null
          代表字頭記号?: string | null
          備考?: string | null
          国書DB所在?: string | null
          文字数?: string | null
          行数?: number | null
          見出し語?: string | null
          "訓読み(左傍1字目)"?: string | null
          "訓読み(左傍1字目補完)"?: string | null
          "訓読み(左傍2字目)"?: string | null
          "訓読み(左傍3字目)"?: string | null
          "訓読み(左傍4字目)"?: string | null
          "訓読み(左傍5字目)"?: string | null
          "語形（音読み）"?: string | null
          部?: string | null
          "音読み(右傍1字目)"?: string | null
          "音読み(右傍1字目補完)"?: string | null
          "音読み(右傍2字目)"?: string | null
          "音読み(右傍3字目)"?: string | null
          "音読み(右傍4字目)"?: string | null
          "音読み(右傍5字目)"?: string | null
        }
        Update: {
          "２字目"?: string | null
          "3字目"?: string | null
          "4字目"?: string | null
          "5字目"?: string | null
          ID?: string
          "ページ数（笠間書院総索引／天理図書館善本叢"?: number | null
          代表字?: string | null
          代表字頭記号?: string | null
          備考?: string | null
          国書DB所在?: string | null
          文字数?: string | null
          行数?: number | null
          見出し語?: string | null
          "訓読み(左傍1字目)"?: string | null
          "訓読み(左傍1字目補完)"?: string | null
          "訓読み(左傍2字目)"?: string | null
          "訓読み(左傍3字目)"?: string | null
          "訓読み(左傍4字目)"?: string | null
          "訓読み(左傍5字目)"?: string | null
          "語形（音読み）"?: string | null
          部?: string | null
          "音読み(右傍1字目)"?: string | null
          "音読み(右傍1字目補完)"?: string | null
          "音読み(右傍2字目)"?: string | null
          "音読み(右傍3字目)"?: string | null
          "音読み(右傍4字目)"?: string | null
          "音読み(右傍5字目)"?: string | null
        }
        Relationships: []
      }
      "racvyoxv-dev": {
        Row: {
          "２字目": string | null
          "3字目": string | null
          "4字目": string | null
          "5字目": string | null
          GallicaURL: string | null
          ID: string | null
          "ページ数（笠間書院総索引／天理図書館善本叢": number | null
          代表字: string | null
          代表字頭記号: string | null
          備考: string | null
          文字数: number | null
          篇名: string | null
          行数: string | null
          見出し語: string | null
          "訓読み(左傍1字目)": string | null
          "訓読み(左傍1字目補完)": string | null
          "訓読み(左傍2字目)": string | null
          "訓読み(左傍3字目)": string | null
          "訓読み(左傍4字目)": string | null
          "訓読み(左傍5字目)": string | null
          "語形（音読み）": string | null
          部: string | null
          "音読み(右傍1字目)": string | null
          "音読み(右傍1字目補完)": string | null
          "音読み(右傍2字目)": string | null
          "音読み(右傍3字目)": string | null
          "音読み(右傍4字目)": string | null
          "音読み(右傍5字目)": string | null
        }
        Insert: {
          "２字目"?: string | null
          "3字目"?: string | null
          "4字目"?: string | null
          "5字目"?: string | null
          GallicaURL?: string | null
          ID?: string | null
          "ページ数（笠間書院総索引／天理図書館善本叢"?: number | null
          代表字?: string | null
          代表字頭記号?: string | null
          備考?: string | null
          文字数?: number | null
          篇名?: string | null
          行数?: string | null
          見出し語?: string | null
          "訓読み(左傍1字目)"?: string | null
          "訓読み(左傍1字目補完)"?: string | null
          "訓読み(左傍2字目)"?: string | null
          "訓読み(左傍3字目)"?: string | null
          "訓読み(左傍4字目)"?: string | null
          "訓読み(左傍5字目)"?: string | null
          "語形（音読み）"?: string | null
          部?: string | null
          "音読み(右傍1字目)"?: string | null
          "音読み(右傍1字目補完)"?: string | null
          "音読み(右傍2字目)"?: string | null
          "音読み(右傍3字目)"?: string | null
          "音読み(右傍4字目)"?: string | null
          "音読み(右傍5字目)"?: string | null
        }
        Update: {
          "２字目"?: string | null
          "3字目"?: string | null
          "4字目"?: string | null
          "5字目"?: string | null
          GallicaURL?: string | null
          ID?: string | null
          "ページ数（笠間書院総索引／天理図書館善本叢"?: number | null
          代表字?: string | null
          代表字頭記号?: string | null
          備考?: string | null
          文字数?: number | null
          篇名?: string | null
          行数?: string | null
          見出し語?: string | null
          "訓読み(左傍1字目)"?: string | null
          "訓読み(左傍1字目補完)"?: string | null
          "訓読み(左傍2字目)"?: string | null
          "訓読み(左傍3字目)"?: string | null
          "訓読み(左傍4字目)"?: string | null
          "訓読み(左傍5字目)"?: string | null
          "語形（音読み）"?: string | null
          部?: string | null
          "音読み(右傍1字目)"?: string | null
          "音読み(右傍1字目補完)"?: string | null
          "音読み(右傍2字目)"?: string | null
          "音読み(右傍3字目)"?: string | null
          "音読み(右傍4字目)"?: string | null
          "音読み(右傍5字目)"?: string | null
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
      count_dhsjr_all_fields_by_word: {
        Args: { search_query: string }
        Returns: number
      }
      get_dhsjr_books: {
        Args: never
        Returns: {
          資料名: string
          資料番号: string
        }[]
      }
      get_racvyoxv_distinct_bu: {
        Args: never
        Returns: {
          部: string
        }[]
      }
      search_dhsjr_all_fields_by_word: {
        Args: { page_number?: number; page_size?: number; search_query: string }
        Returns: {
          ID: string
          score: number
          その他: string
          仮名型: string
          仮名注: string
          備考: string
          出現位置: string
          単字_出現形: string
          単字_見出し: string
          単字長: string
          反切: string
          声点: string
          声点型: string
          漢語_alphabet: string
          漢語_出現形: string
          漢語_見出し: string
          漢語内位置: string
          節博士: string
          語種: string
          資料内漢字番号: number
          資料内漢語番号: string
          資料名: string
          資料番号: string
          類音: string
        }[]
      }
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


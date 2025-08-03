import React from 'react'

interface SiteDescriptionProps {
  title?: string
}

export function SiteDescription({ title }: SiteDescriptionProps) {
  return (
    <div className="bg-base-200 p-6 rounded-lg mb-6">
      <h3 className="text-xl font-semibold mb-4">
        {title || '本サイトについて'}
      </h3>
      <div className="prose max-w-none">
        <h2>本サイトについて</h2>
        <p>辞書語彙データベースの収録辞書は、次のとおりです。詳細は各データベースのページをご覧ください。</p>
        <ul>
          <li><a href="/hzwm">『本草和名』</a>（底本：寛政八年刊記本）</li>
          <li><a href="/kwrs">古活字版『和名類聚抄』</a></li>
          <li><a href="/jiruisho">『三巻本色葉字類抄』</a></li>
          <li><a href="/racvyoxv">『落葉集本篇』</a></li>
          <li><a href="/bunmei">『文明本節用集』</a>（底本：<a href="https://dl.ndl.go.jp/pid/1286982" target="_blank" rel="noopener noreferrer">国立国会図書館蔵〔雑字類書〕</a>）</li>
          <li><a href="/gyokuhentaizen">『増続大広益会玉篇大全』</a></li>
          <li><a href="/wakunnoshiori">『版本和訓栞』</a></li>
        </ul>
      </div>
    </div>
  )
}
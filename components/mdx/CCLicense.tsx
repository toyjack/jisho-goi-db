import React from 'react'

interface CCLicenseProps {
  title?: string
}

export function CCLicense({ title }: CCLicenseProps) {
  return (
    <div className="bg-base-200 p-4 rounded-lg mb-6">
      <div className="flex items-center gap-4">
        <img 
          src="https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by.png" 
          alt="Creative Commons License"
          className="w-20 h-auto"
        />
        <div>
          <p className="font-medium">この作品は</p>
          <a 
            href="http://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="link link-primary"
          >
            クリエイティブ・コモンズ 表示 4.0 国際 ライセンス
          </a>
          <p>の下に提供されています。</p>
        </div>
      </div>
    </div>
  )
}
import React from 'react'

interface Member {
  name: string
  nameInEnglish?: string
  imageUrl?: string
  linkUrl?: string
}

interface MembersListProps {
  members: Member[]
}

export function MembersList({ members }: MembersListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {members.map((member, index) => (
        <div key={index} className="card bg-base-100 shadow-md">
          <div className="card-body text-center">
            {member.imageUrl && (
              <div className="avatar mx-auto mb-4">
                <div className="w-24 rounded-full">
                  <img src={member.imageUrl} alt={member.name} />
                </div>
              </div>
            )}
            <h3 className="card-title justify-center text-lg">
              {member.name}
            </h3>
            {member.nameInEnglish && (
              <p className="text-sm opacity-70">{member.nameInEnglish}</p>
            )}
            {member.linkUrl && (
              <div className="card-actions justify-center mt-4">
                <a 
                  href={member.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  詳細を見る
                </a>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
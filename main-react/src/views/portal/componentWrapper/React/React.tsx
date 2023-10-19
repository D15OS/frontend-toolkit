import { useNavigate } from 'react-router-dom'

const profiles = import.meta.glob(
  '/src/components/**/profile.ts',
  { eager: true, import: 'default' },
) as Record<string, Profile>

interface Profile {
  name: string,
  desc:string
}

function React() {
  const navigate = useNavigate()
  const toDetail = (profile:unknown) => {
    navigate('/portal/detail', { state: { profile } })
  }
  return (
    <div>
      {
        Object.values(profiles).map((profile) => {
          return (
            <div
              className="bg-red-400"
              key={profile.name}
              onClick={() => toDetail(profile)}
            >
              {profile.name}
            </div>
          )
        })
      }
    </div>
  )
}
export default React

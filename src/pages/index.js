import dynamic from 'next/dynamic'
const IAFirstLevel = dynamic(() => import('../components/IAFirstLevel'), { ssr: false })
export default function Home() {
  return <IAFirstLevel />
}

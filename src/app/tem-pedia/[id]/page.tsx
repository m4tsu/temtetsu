import type { PageProps } from '@/libs/nextjs/util-types'

const TemtemPage = ({ params: { id } }: PageProps<'id'>) => {
  return (
    <div>
      <h2>テムテムPage</h2>
      <p>id: {id}</p>
    </div>
  )
}

export default TemtemPage

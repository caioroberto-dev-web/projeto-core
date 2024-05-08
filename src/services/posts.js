import useApi from 'src/composable/UseApi'

export default function postService () {
  const { post, update, remove, getById, getAll } = useApi('/pessoas')

  return {
    post,
    update,
    remove,
    getById,
    getAll
  }
}

import useApi from 'src/composable/UseApi'

export default function postService () {
  const { post, update, remove, getById } = useApi('/pessoas')

  return {
    post,
    update,
    remove,
    getById
  }
}

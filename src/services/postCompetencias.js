import useApi from 'src/composable/UseApi'

export default function postService () {
  const { postCompetencias, getCompetenciasById } = useApi('/pessoas/1/competencias')

  return {
    postCompetencias,
    getCompetenciasById
  }
}

import { getProviders, signIn } from 'next-auth/react'
import { Button, Center, VStack } from '@chakra-ui/react'
function Login({ providers }) {
  return (
    <VStack mt="40" spacing={8}>
      <img src="https://img.icons8.com/color/240/000000/spotify--v1.png" />
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <Button
            bg="green.light"
            color="whiteAlpha.900"
            _hover={{
              background: 'gray.dark',
            }}
          >
            Login with {provider.name}
          </Button>
        </div>
      ))}
    </VStack>
  )
}
export default Login
export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: {
      providers,
    },
  }
}

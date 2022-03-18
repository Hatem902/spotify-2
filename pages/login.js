import { getProviders, signIn } from 'next-auth/react'
import { Button, VStack } from '@chakra-ui/react'
function Login({ providers }) {
  return (
    <VStack mt="40" spacing={16}>
      <img src="https://img.icons8.com/ios-filled/250/ffffff/spotify.png" />
      {Object.values(providers).map((provider) => (
        <Button
          size="lg"
          key={provider.name}
          bg="gray.dark"
          color="whiteAlpha.900"
          _hover={{
            background: 'gray.light',
          }}
          onClick={() => signIn(provider.id, { callbackUrl: '/' })}
        >
          Login with {provider.name}
        </Button>
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

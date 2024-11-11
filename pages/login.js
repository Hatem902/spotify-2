import { getProviders, signIn } from 'next-auth/react';
import { Button, Image, VStack } from '@chakra-ui/react';
import Head from 'next/head';
function Login({ providers }) {
  return (
    <>
      <Head>
        <title>Login to Spotify</title>
        <meta
          name="description"
          content="Spotify Loging page : Authentification with NextAuth , nextjs Middleware "
        />
      </Head>
      <VStack mt="40" spacing={16}>
        <Image src="https://img.icons8.com/ios-filled/250/ffffff/spotify.png" />
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
    </>
  );
}
export default Login;
export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}

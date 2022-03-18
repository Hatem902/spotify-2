import { VStack } from '@chakra-ui/layout';
const Layout = ({ children }) => {
  return (
    <div>
      <VStack
        overflow="hidden"
        height="100vh"
        bg="black"
        width="full"
        spacing={0}
      >
        {children}
      </VStack>
    </div>
  );
};

export default Layout;

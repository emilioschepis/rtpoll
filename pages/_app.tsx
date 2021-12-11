import "../styles/globals.css";

import { ChakraProvider } from "@chakra-ui/react";
import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";
import type { AppProps } from "next/app";
import { QueryClientProvider } from "react-query";

import Header from "../src/components/core/Header";
import AuthProvider from "../src/context/AuthContext";
import queryClient from "../src/query/query";
import theme from "../src/theme/theme";

dayjs.extend(RelativeTime);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <Header />
          <Component {...pageProps} />
        </ChakraProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default MyApp;

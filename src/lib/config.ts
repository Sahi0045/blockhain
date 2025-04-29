// @ts-nocheck

import { SupportChainId } from '@/hooks/use-query-commemes';
import { http, createConfig } from 'wagmi';
import { Chain, coreDao, polygon, unichainSepolia } from 'wagmi/chains';

const chains = [unichainSepolia] as any;


export  const config  = createConfig({
  chains,
  transports: {
    [unichainSepolia.id]: http(),
  },
}) as any;
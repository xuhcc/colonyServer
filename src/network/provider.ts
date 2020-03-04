import { providers } from 'ethers'

import { blockchainNetwork, infuraId, rpcEndpoint } from '../env'
import { NETWORK_LOCAL, NETWORK_LOCAL_URL } from '../constants';

let provider;

if (blockchainNetwork === NETWORK_LOCAL) {
	provider = new providers.JsonRpcProvider(NETWORK_LOCAL_URL);
} else if (rpcEndpoint) {
	provider = new providers.JsonRpcProvider(rpcEndpoint);
} else {
  	provider = new providers.InfuraProvider(blockchainNetwork, infuraId);
}

export {provider};
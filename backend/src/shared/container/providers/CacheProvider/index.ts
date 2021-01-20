import { container } from 'tsyringe';

import ICachePRovider from './models/ICachePRovider';

import RedisCacheProvider from './implementations/RedisCacheProvider';

const providers = {
    redis: RedisCacheProvider,
};

container.registerSingleton<ICachePRovider>('CacheProvider', providers.redis);

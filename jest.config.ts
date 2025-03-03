import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    transform: {
        '^.+\\.js?$': 'ts-jest',
    },
    testEnvironment: 'node',
};

export default config;

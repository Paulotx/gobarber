interface IMailConfig {
    driver: 'ethereal' | 'ses';
    defaults: {
        from: {
            email: string;
            name: string;
        };
    };
}

export default {
    driver: process.env.MAIL_DRIVER || 'ethereal',

    defaults: {
        from: {
            email: 'contato@xupxupgeladinhos.com.br',
            name: 'Paulo André Teixeira',
        },
    },
} as IMailConfig;

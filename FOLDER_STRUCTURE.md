prisma
migrations
schema.prisma

src
domain
users
use-cases
authenticate-user
authenticateUserUseCase.spec.ts
authenticateUserUseCase.ts

                create-user
                    createUserUseCase.spec.ts
                    createUserUseCase.ts

                ...

            entities
                UserToken.spec.ts
                userToken.ts
                User.spec.ts
                user.ts
                ...

        skills
            use-cases
                create-user-skill
                    createUserSkillUseCase.spec.ts
                    createUserSkillUseCase.ts

                ...

            entities
                UserSkill.spec.ts
                userSkill.ts
                ...

    application
        controllers
            users
                authenticate-user
                    authenticateUserController.e2e.spec.ts
                    authenticateUserController.ts

                create-user
                    createUserController.e2e.spec.ts
                    createUserController.ts

                ...

            skills
                create-user-skill
                    createUserSkillController.e2e.spec.ts
                    createUserSkillController.ts

                ...

        dtos
            users
                createUserDto.ts
                ...

            skills
                createUserSkillDto.ts
                ...

        factories
            users
                createNewUserFactory.ts
                ...

            skills
                createNewUserSkillFactory.ts
                ...

        errors
            users
                userAlreadyExistsError.ts
                ...

            skills
                skillAlreadyExistsError.ts
                ...

        routes
            users
                swagger-schemas
                    authSwaggerSchema.ts
                    usersSwaggerSchema.ts
                    ...
                authRoutes.ts
                usersRoutes.ts
                ...

            skills
                swagger-schemas
                    skillsSwaggerSchema.ts
                skillsRoutes.ts
                ...

            index.ts

        views
            users
                emails
                    forgotPassword.hbs
                    ...

                ...

            skills

                ...


    core
        config
            env
                index.ts

        database
            lib
                index.ts

        errors
            resourceNotFoundError.ts
            ...

        types
            fastify-jwt.d.ts
            ...

        helpers
            replace.ts
            ...

        middlewares
            verifyJwt.ts
            verifyUserRole.ts
            ...

        providers
            date-provider
                IDateProvider.ts
            mail-provider
                IMailProvider.ts

        utils
            test
                createAndAuthenticateUser.ts
                ...
            passwordHashing.ts
            ...

    infra
        repositories
            users
                in-memory
                    inMemoryUsersRepository.ts
                    ...
                prisma
                    use-cases-factories
                        buildCreateUserUseCase.ts
                        ...
                    prismaUsersRepository.ts
                    ...
                IUsersRepositories.ts
                ...

            skills
                in-memory
                    inMemoryUserSkillsRepository.ts
                    ...
                prisma
                    use-cases-factories
                        buildCreateUserSkillUseCase.ts
                        ...
                    prismaUserSkillsRepository.ts
                    ...
                IUserSkillsRepository.ts
                ...

        providers
            date-providers
                implementation
                    daysjsDateProvider.ts
                    ...
                index.ts

            mail-provider
                implementation
                    etherealMailProvider.ts
                    sesMailProvider.ts
                    ...
                index.ts

        mappers
            users
                userMapper.ts
                ...
            skills
                userSkillMapper.ts
                ...

    app.ts
    server.ts

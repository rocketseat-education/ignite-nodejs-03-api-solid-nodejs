# RFs

- [x] It should be able to register;
- [x] It should be able to authenticate;
- [ ] It should be able to get authenticated member profile;
- [ ] It should be able to get authenticated member amount of check-ins;
- [ ] It should be able to fetch check-in history;
- [ ] It should be able to fetch nearby gyms;
- [ ] It should be able to search for gyms by name;
- [ ] It should be able to check-in on specific gym;
- [ ] It should be able to validate user check-in;
- [ ] It should be able to create a new gym;

# RNFs

- [x] The user password must be hashed;
- [ ] The user must be identified by a JWT (JSON Web Token);
- [ ] The data will be persisted on PostgreSQL;
- [ ] All lists should be paginated with default 20 items per page;

# RNs

- [ ] User should not be able to register with same e-mail from another user;
- [ ] The user cannot check-in twice in the same day;
- [ ] The user cannot check-in if not nearby (100m radius) the gym;
- [ ] The check-in can only be validated for 20 minutes after created;
- [ ] The check-in can only be validate by admin users;
- [ ] The gym can only be created by admin users;
# RFs

- [x] It should be able to register;
- [x] It should be able to authenticate;
- [x] It should be able to get authenticated member profile;
- [x] It should be able to get authenticated member amount of check-ins;
- [x] It should be able to fetch check-in history;
- [x] It should be able to fetch nearby gyms;
- [x] It should be able to search for gyms by name;
- [x] It should be able to check-in on specific gym;
- [x] It should be able to validate user check-in;
- [x] It should be able to create a new gym;

# RNFs

- [x] The user password must be hashed;
- [ ] The user must be identified by a JWT (JSON Web Token);
- [x] The data will be persisted on PostgreSQL;
- [x] All lists should be paginated with default 20 items per page;

# RNs

- [x] User should not be able to register with same e-mail from another user;
- [x] The user cannot check-in twice in the same day;
- [x] The user cannot check-in if not nearby (100m radius) the gym;
- [x] The check-in can only be validated for 20 minutes after created;
- [ ] The check-in can only be validate by admin users;
- [ ] The gym can only be created by admin users;
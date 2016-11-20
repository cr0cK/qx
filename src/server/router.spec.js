/* global expect: true */

import { selectProfiles } from './router';

describe('router', () => {
  describe('selectProfiles', () => {
    const configProfiles = [{
      name: 'shop',
      urlsFilter: req => /^\/api\/shop\//.test(req.originalUrl),
    }, {
      name: 'account',
      urlsFilter: req => /^\/api\/account\//.test(req.originalUrl),
    }];

    it('returns the profiles matching the request', () => {
      const req = {
        originalUrl: '/api/shop/checkout',
      };

      const profiles = selectProfiles(configProfiles, req);

      expect(profiles.map(profil => profil.name)).toEqual([
        'shop',
      ]);
    });

    it('returns the default profil if none match the request', () => {
      const req = {
        originalUrl: '/api/billing/invoices',
      };

      const profiles = selectProfiles(configProfiles, req);

      expect(profiles.map(profil => profil.name)).toEqual([
        'default',
      ]);
    });

    it('returns the default profil if no profiles has been defined', () => {
      const req = {
        originalUrl: '/api/billing/invoices',
      };

      const profiles = selectProfiles([], req);

      expect(profiles.map(profil => profil.name)).toEqual([
        'default',
      ]);
    });
  });
});

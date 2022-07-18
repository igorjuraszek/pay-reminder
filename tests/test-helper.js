import Application from 'pay-reminder/app';
import config from 'pay-reminder/config/environment';
import * as QUnit from 'qunit';
import { setApplication } from '@ember/test-helpers';
import { setup } from 'qunit-dom';
import { start } from 'ember-qunit';
import { faker } from '@faker-js/faker';

setApplication(Application.create(config.APP));

setup(QUnit.assert);

faker.setLocale('pl');

start();

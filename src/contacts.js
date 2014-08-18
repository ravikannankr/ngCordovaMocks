/**
 * Copyright (c) 2014 Ecofic LLC. All rights reserved.
 * http://www.ecofic.com

 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.

 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

/**
 * @ngdoc service
 * @name ngCordovaMocks.cordovaContacts
 *
 * @description
 * A service for testing features related with contacts
 * in an app build with ngCordova.
**/  
ngCordovaMocks.factory('$cordovaContacts', ['$q', function($q) {
	var throwsError = false;
	var contacts = [];

	return {
        /**
		 * @ngdoc property
		 * @name throwsError
		 * @propertyOf ngCordovaMocks.cordovaContacts
		 *
		 * @description
		 * A flag that signals whether a promise should be
		 * rejected or not. It is intended for testing purposes only.
		**/
		throwsError: throwsError,

        /**
		 * @ngdoc contacts
		 * @name throwsError
		 * @propertyOf ngCordovaMocks.cordovaContacts
		 *
		 * @description
		 * An in-memory collection of contacts.
		 * This collection is intended for testing purposes only.
		**/
		contacts: contacts,

		/**
		 * @ngdoc method
		 * @name save
		 * @methodOf ngCordovaMocks.cordovaContacts
		 *
		 * @description
		 * A mock method used to simulate saving a contact.
		**/
		save: function(contact) {
			var defer = $q.defer();
			if (this.throwsError) {
				defer.reject('There was an error saving the contact.');
			} else {
				var existingIndex = null;
				for (var i=0; i<this.contacts.length; i++) {
					// The actual implementation relies on the entire object match.
					// we're gong to rely on the ID.
					if (this.contacts[i].id === contact.id) {
						existingIndex = i;
						break;
					}
				}

				if (existingIndex === null) {
					this.contacts.push(contact);
					defer.resolve();					
				} else {
					defer.reject('Contact already exists.');
				}
			}
			return defer.promise;
		},

		/**
		 * @ngdoc method
		 * @name remove
		 * @methodOf ngCordovaMocks.cordovaContacts
		 *
		 * @description
		 * A mock method used to simulate removing a contact.
		**/
		remove: function(contact) {
			var defer = $q.defer();
			if (this.throwsError) {
				defer.reject('There was an error saving the contact.');
			} else {
				var toRemove = null;
				for (var i=0; i<this.contacts.length; i++) {
					// The actual implementation relies on the entire object match.
					// we're gong to rely on the ID.
					if (this.contacts[i].id === contact.id) {
						toRemove = i;
						break;
					}
				}

				if (toRemove === null) {
					defer.reject('Unable to find contact.');
				} else {
					this.contacts.splice(toRemove, 1);
					defer.resolve();
				}
			}
			return defer.promise;
		},

		/**
		 * @ngdoc method
		 * @name find
		 * @methodOf ngCordovaMocks.cordovaContacts
		 *
		 * @description
		 * A mock method used to simulate finding a contact.
		**/
		find: function(options) {
			var defer = $q.defer();
			if (this.throwsError) {
				defer.reject('There was an error finding the contact.');
			} else {
				var fields = options.fields || ['id', 'displayName'];
				delete options.fields;				

				if (!fields) {
					defer.reject('ContactError.INVALID_ARGUMENT_ERROR');
				} else {
					if (fields === '*') {
						defer.resolve(this.contacts);
					} else {
						// TODO: Search by individual fields
						defer.resolve();
					}
				}
			}
			return defer.promise;			
		}
	};
}]);
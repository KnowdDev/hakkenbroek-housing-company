'use client';

import { useState } from 'react';
import { Metadata } from 'next';

export default function PropertiesPage() {
  const [filter, setFilter] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  const properties = [
    {
      id: 1,
      title: 'Jacob Catskade 51 H',
      location: 'Amsterdam',
      price: 600000,
      size: 68,
      bedrooms: 3,
      status: 'available',
      energyLabel: 'A',
      pricePerSqm: 8824
    },
    {
      id: 2,
      title: 'Van Woustraat 22 1',
      location: 'Amsterdam',
      price: 745000,
      size: 103,
      bedrooms: 3,
      status: 'under-consideration',
      energyLabel: 'D',
      pricePerSqm: 7233
    },
    {
      id: 3,
      title: 'Singel 204 C',
      location: 'Amsterdam',
      price: 625000,
      size: 73,
      bedrooms: 1,
      status: 'sold',
      energyLabel: 'A',
      pricePerSqm: 8562
    }
  ];

  const filteredProperties = properties.filter(property => {
    const statusMatch = filter === 'all' || property.status === filter;
    let priceMatch = true;
    
    if (priceRange === 'under-600k') {
      priceMatch = property.price < 600000;
    } else if (priceRange === '600k-700k') {
      priceMatch = property.price >= 600000 && property.price < 700000;
    } else if (priceRange === '700k-plus') {
      priceMatch = property.price >= 700000;
    }
    
    return statusMatch && priceMatch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'under-consideration':
        return 'bg-yellow-100 text-yellow-800';
      case 'sold':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'available':
        return 'Available';
      case 'under-consideration':
        return 'Under Consideration';
      case 'sold':
        return 'Sold';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Properties</h1>
          <p className="text-xl text-primary-100 max-w-3xl">
            Discover our selection of premium properties in Amsterdam and the surrounding areas
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Properties</option>
                <option value="available">Available</option>
                <option value="under-consideration">Under Consideration</option>
                <option value="sold">Sold</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Prices</option>
                <option value="under-600k">Under €600,000</option>
                <option value="600k-700k">€600,000 - €700,000</option>
                <option value="700k-plus">€700,000+</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'}
            </p>
          </div>

          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property) => (
                <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
                  <div className="h-48 bg-gradient-to-r from-primary-400 to-primary-600 flex items-center justify-center">
                    <span className="text-white text-lg font-semibold">Property Image</span>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{property.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded ${getStatusColor(property.status)}`}>
                        {getStatusLabel(property.status)}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{property.location}</p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-2xl font-bold text-primary-600">
                        €{property.price.toLocaleString()}
                      </span>
                      <span className="text-gray-500">
                        {property.size} m² • {property.bedrooms} bed
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                      <span>€{property.pricePerSqm.toLocaleString()}/m²</span>
                      <span className="flex items-center">
                        Energy Label: <span className="ml-1 font-semibold">{property.energyLabel}</span>
                      </span>
                    </div>
                    <button className="block w-full text-center bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No properties match your filters.</p>
              <button
                onClick={() => {
                  setFilter('all');
                  setPriceRange('all');
                }}
                className="mt-4 text-primary-600 hover:text-primary-700 font-semibold"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Interested in a Property?</h2>
          <p className="text-xl mb-8 text-primary-100">
            Contact us to schedule a viewing or get more information
          </p>
          <a href="/contact" className="inline-block bg-white text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
}

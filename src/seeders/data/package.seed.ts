export const packageList = [
  {
    package_name: 'Free',
    monthly_subscription: 0.0,
    description: 'Basic package with limited features.',
    features: [
      {
        feature_name: 'Basic Support',
        feature_description: 'Email support only.',
      },
      {
        feature_name: 'Limited Access',
        feature_description: 'Access to basic features.',
      },
    ],
    case_count: 10,
    client_count: 5,
    storage: 10,
    status: 1,
  },
  {
    package_name: 'Premium',
    monthly_subscription: 50.0,
    description: 'Premium package with additional features.',
    features: [
      {
        feature_name: 'Priority Support',
        feature_description:
          '24/7 support via phone and email.',
      },
      {
        feature_name: 'Full Access',
        feature_description: 'Access to all features.',
      },
    ],
    case_count: 100,
    client_count: 50,
    storage: 100,
    status: 1,
  },
  {
    package_name: 'Enterprise',
    monthly_subscription: 200.0,
    description: 'Enterprise package with custom features.',
    features: [
      {
        feature_name: 'Dedicated Support',
        feature_description: 'Custom support team.',
      },
      {
        feature_name: 'Custom Solutions',
        feature_description:
          'Tailored solutions for your business.',
      },
    ],
    case_count: 500,
    client_count: 200,
    storage: 500,
    status: 1
  },
];

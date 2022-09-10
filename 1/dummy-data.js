const DUMMY_EVENTS = [
    {
      id: 'e1',
      title: 'Programming for everyone',
      description:
        'We cover the basics of how one constructs a program from a series of simple instructions in Python. The course has no prerequisites and avoids all but the simplest mathematics.',
      location: 'Somestreet 25, 12345 San Somewhereo',
      date: '2022-05-12',
      image: 'images/Programming.jpg',
      isFeatured: false,
    },
    {
      id: 'e2',
      title: 'Networking for everyone',
      description:
        "First of all, professional networking has no relation to computer networking. At its core, the kind of networking we're discussing is about meeting new people.",
      location: 'New Wall Street 5, 98765 New Work',
      date: '2022-05-30',
      image: 'images/Networking.jpg',
      isFeatured: true,
    },
    {
      id: 'e3',
      title: 'Machine learning for everyone',
      description:
        'The Complete Beginner’s Guide to Understanding and Building Machine Learning Systems with Python Machine Learning with Python for Everyone will help you master the processes, patterns, and strategies you need to build effective learning systems',
      location: 'My Street 12, 10115 Broke City',
      date: '2022-04-10',
      image: 'images/Machine-learning.jpg',
      isFeatured: true,
    },
  ];
  
  export function getFeaturedEvents() {
    return DUMMY_EVENTS.filter((event) => event.isFeatured);
  }
  
  export function getAllEvents() {
    return DUMMY_EVENTS;
  }
  
  export function getFilteredEvents(dateFilter) {
    const { year, month } = dateFilter;
  
    let filteredEvents = DUMMY_EVENTS.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
    });
  
    return filteredEvents;
  }
  
  export function getEventById(id) {
    return DUMMY_EVENTS.find((event) => event.id === id);
  }
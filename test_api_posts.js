async function testHospitalBooking() {
  console.log('Testing /api/hospital/appointments...');
  try {
    const res = await fetch('http://localhost:3000/api/hospital/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        patientName: 'Test Patient',
        phone: '1234567890',
        specialty: 'Cardiology',
        doctor: 'Dr. Alok Verma',
        date: '2026-06-15',
        time: '10:30 AM'
      })
    });
    console.log(`Hospital Booking Status: ${res.status}`);
    const data = await res.json();
    console.log('Hospital Booking Response:', data);
  } catch (err) {
    console.error('Hospital Booking Failed:', err.message);
  }
}

async function testUPVCQuote() {
  console.log('\nTesting /api/upvc/quotes...');
  try {
    const res = await fetch('http://localhost:3000/api/upvc/quotes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        product: 'Casement Window',
        width: 5,
        height: 4,
        glassType: 'Double Glazed',
        frameColor: 'White',
        quantity: 2,
        estimatedPrice: 15000,
        name: 'Test Customer',
        email: 'test@example.com',
        phone: '9876543210',
        message: 'Test message for quote'
      })
    });
    console.log(`UPVC Quote Status: ${res.status}`);
    const data = await res.json();
    console.log('UPVC Quote Response:', data);
  } catch (err) {
    console.error('UPVC Quote Failed:', err.message);
  }
}

async function testUPVCContact() {
  console.log('\nTesting /api/upvc/contacts...');
  try {
    const res = await fetch('http://localhost:3000/api/upvc/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Contact',
        email: 'test@example.com',
        phone: '9876543210',
        productInterest: 'Doors',
        message: 'This is a test message to satisfy the minimum length requirement.'
      })
    });
    console.log(`UPVC Contact Status: ${res.status}`);
    const data = await res.json();
    console.log('UPVC Contact Response:', data);
  } catch (err) {
    console.error('UPVC Contact Failed:', err.message);
  }
}

async function testUPVCNewsletter() {
  console.log('\nTesting /api/upvc/newsletter...');
  try {
    const res = await fetch('http://localhost:3000/api/upvc/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'testnewsletter@example.com'
      })
    });
    console.log(`UPVC Newsletter Status: ${res.status}`);
    const data = await res.json();
    console.log('UPVC Newsletter Response:', data);
  } catch (err) {
    console.error('UPVC Newsletter Failed:', err.message);
  }
}

async function testLeads() {
  console.log('\nTesting /api/leads...');
  try {
    const res = await fetch('http://localhost:3000/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Lead',
        email: 'lead@example.com',
        phone: '1234567890',
        source: 'main_contact',
        message: 'Hello, this is a test lead.'
      })
    });
    console.log(`Leads Status: ${res.status}`);
    const data = await res.json();
    console.log('Leads Response:', data);
  } catch (err) {
    console.error('Leads Failed:', err.message);
  }
}

async function runAll() {
  await testHospitalBooking();
  await testUPVCQuote();
  await testUPVCContact();
  await testUPVCNewsletter();
  await testLeads();
}

runAll();

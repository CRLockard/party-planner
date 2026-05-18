// === Constants ===
const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2603-FTB-CT-WEB-PT"; // Make sure to change this!
const EVENTS = "/events";
const GUESTS = "/guests";
const RSVPS = "/rsvps";
const EVENTAPI = BASE + COHORT + EVENTS;
const GUESTAPI = BASE + COHORT + GUESTS;
const RSVPSAPI = BASE + COHORT + RSVPS;

//==========State==========
let events = [];
let selectedEvent;
let guests = [];
let selectedGuest;
let rsvps = [];
let selctedRsvps;

//=====EventAPI=====
async function getEvents() {
  try {
    const response = await fetch(EVENTAPI);
    const result = await response.json();
    events = result.data;
    render();
  } catch (e) {
    console.error(e);
  }
}

/** Updates state with a single event from the API */
async function getEvent(id) {
  try {
    const response = await fetch(EVENTAPI + "/" + id);
    const result = await response.json();
    selectedEvent = result.data;
    render();
  } catch (e) {
    console.error(e);
  }
}

//=====Guest API=====

async function getGuests() {
  try {
    const response = await fetch(GUESTAPI);
    const result = await response.json();
    guests = result.data;
    render();
  } catch (e) {
    console.error(e);
  }
}

async function getGuest(id) {
  try {
    const response = await fetch(GUESTAPI + "/" + id);
    const result = await response.json();
    selectedGuest = result.data;
    render();
  } catch (e) {
    console.error(e);
  }
}

//=====RSVP API=====
async function getRsvps() {
  try {
    const response = await fetch(RSVPSAPI);
    const result = await response.json();
    rsvps = result.data;
    render();
  } catch (e) {
    console.error(e);
  }
}

async function getRsvp(id) {
  try {
    const response = await fetch(RSVPSAPI + "/" + id);
    const result = await response.json();
    selctedRsvps = result.data;
    render();
  } catch (e) {
    console.error(e);
  }
}

//=====components=====
/** Event name that shows more details about the event when clicked */
function EventListItem(event) {
  const $li = document.createElement("li");
  $li.innerHTML = `
    <a href="#selected">${event.name}</a>
  `;
  $li.addEventListener("click", () => getEvent(event.id));
  return $li;
}

//a list of names of all events
function EventList() {
  const $ul = document.createElement("ul");
  $ul.classList.add("lineup");

  const $events = events.map(EventListItem);
  $ul.replaceChildren(...$events);
  $ul.style.listStyleType = "none";

  return $ul;
}

//get events details when event is selcted.
function EventDetails() {
  if (!selectedEvent) {
    const $p = document.createElement("p");
    $p.textContent = "Please select an event to learn more.";
    return $p;
  }

  const $event = document.createElement("section");
  $event.classList.add("event");
  $event.innerHTML = `
<h3>${selectedEvent.name} #${selectedEvent.id}</h3>
<p>${selectedEvent.description}</p>
<p>Date: ${selectedEvent.date}</p>
<p>Location: ${selectedEvent.location}</p>
`;
  return $event;
}

//==========Rander==========
function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>Events At Fullstack</h1>
<main>
    <section>
        <h2>Upcomming Events</h2>
        <EventList></EventList>
    </section>
    <section id="selected">
        <h2>Event Details</h2>
        <EventDetails></EventDetails>
    </section>
</main>
    `;

  $app.querySelector("EventList").replaceWith(EventList());
  $app.querySelector("EventDetails").replaceWith(EventDetails());
}

async function init() {
  await getEvents();
  render();
}

init();

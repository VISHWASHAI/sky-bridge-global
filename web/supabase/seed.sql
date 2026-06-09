-- ============================================================================
-- Seed data — ported from the prototype's MockDatabase (scripts/data.js)
-- Run AFTER 0001_init.sql. Safe to re-run (truncates first).
-- ============================================================================

truncate table shipment_events cascade;
truncate table shipments cascade;
truncate table service_areas cascade;

-- ── Service areas (Indian PIN codes) ───────────────────────────────────────
insert into service_areas (pin_code, city, state, hub_name, address, transit_days, tier, available) values
('563113','Robertsonpet, Kolar — Karnataka','Karnataka','Sky Bridge Global HQ','No. 261, BM Road, Near Industrial Estate, Andersonpet, Robertsonpet — 563113',1,'Express',true),
('560001','Bangalore — Karnataka','Karnataka','Bangalore Freight Hub','Hebbal Industrial Area, Bangalore — 560024',1,'Express',true),
('600001','Chennai — Tamil Nadu','Tamil Nadu','Chennai Port Logistics Center','Foreshore Estate, Chennai — 600028',2,'Priority',true),
('400001','Mumbai — Maharashtra','Maharashtra','JNPT Cargo Gateway','Jawaharlal Nehru Port, Nhava Sheva, Navi Mumbai — 400707',2,'Priority',true),
('110001','New Delhi — Delhi','Delhi','Delhi Air Freight Station','Air Cargo Complex, IGI Airport, New Delhi — 110037',2,'Standard',true),
('500001','Hyderabad — Telangana','Telangana','Hyderabad Logistics Park','Patancheru Industrial Area, Hyderabad — 502319',2,'Standard',true),
('700001','Kolkata — West Bengal','West Bengal','Kolkata Port Distribution Hub','Kidderpore Dock, Kolkata — 700023',3,'Standard',true),
('380001','Ahmedabad — Gujarat','Gujarat','Ahmedabad Cargo Terminal','GIDC Vatva, Ahmedabad — 382445',2,'Priority',true);

-- ── Shipments ───────────────────────────────────────────────────────────────
insert into shipments (tracking_no, status, status_class, origin, destination, weight, dimensions, carrier, current_location, est_delivery) values
('SBG-102948-US','In Transit','warning','Hamburg, Germany (HAM)','New York, USA (JFK)','450 kg','120x80x110 cm','Sky Bridge Air Cargo (Flight SBG-402)','New York (JFK) Clearance Area','June 02, 2026'),
('SBG-584732-EU','Delivered','success','Singapore (SIN)','Rotterdam, Netherlands (RTM)','12,400 kg','1 x 20ft Standard Container','Bridge Liner Ocean Express (Vessel BL-934)','Rotterdam Terminal A4','May 28, 2026'),
('SBG-778899-EU','Customs Clearance','warning','London, UK (LHR)','Tokyo, Japan (NRT)','82 kg','60x60x40 cm','Nippon Cargo Airlines','Tokyo Narita Customs Gateway','June 04, 2026');

-- ── Shipment events ──────────────────────────────────────────────────────────
insert into shipment_events (shipment_id, title, event_time, location, description, status)
select id, 'Arrived at JFK Import Hub', timestamptz '2026-05-29 14:22', 'New York, USA', 'Shipment has landed and is undergoing customs sorting.', 'active' from shipments where tracking_no='SBG-102948-US'
union all select id, 'Departed Export Facility', timestamptz '2026-05-28 09:10', 'Hamburg, Germany', 'Cargo loaded onto flight SBG-402 heading to JFK.', 'completed' from shipments where tracking_no='SBG-102948-US'
union all select id, 'Customs Cleared (Export)', timestamptz '2026-05-27 16:45', 'Hamburg, Germany', 'Export documents verified and cleared by customs.', 'completed' from shipments where tracking_no='SBG-102948-US'
union all select id, 'Package Picked Up', timestamptz '2026-05-26 11:30', 'Munich, Germany', 'Consolidated goods picked up by regional trucking fleet.', 'completed' from shipments where tracking_no='SBG-102948-US'
union all select id, 'Delivered', timestamptz '2026-05-28 16:00', 'Rotterdam, Netherlands', 'Delivered and signed off by warehousing director.', 'completed' from shipments where tracking_no='SBG-584732-EU'
union all select id, 'Out for Final Mile Delivery', timestamptz '2026-05-28 08:30', 'Rotterdam, Netherlands', 'Loaded onto local container transport vehicle.', 'completed' from shipments where tracking_no='SBG-584732-EU'
union all select id, 'Discharged from Vessel', timestamptz '2026-05-26 22:15', 'Rotterdam, Netherlands', 'Container unloaded from vessel BL-934.', 'completed' from shipments where tracking_no='SBG-584732-EU'
union all select id, 'Vessel Departed Singapore Port', timestamptz '2026-05-10 05:00', 'Singapore Port', 'Ocean transit commenced.', 'completed' from shipments where tracking_no='SBG-584732-EU'
union all select id, 'Awaiting Customs Documents', timestamptz '2026-05-29 10:00', 'Tokyo Narita, Japan', 'Importer requested to provide HS Code clarification.', 'active' from shipments where tracking_no='SBG-778899-EU'
union all select id, 'Arrived at destination import hub', timestamptz '2026-05-29 05:12', 'Tokyo Narita, Japan', 'Unloading completed.', 'completed' from shipments where tracking_no='SBG-778899-EU'
union all select id, 'Departed London Hub', timestamptz '2026-05-27 21:00', 'London Heathrow, UK', 'Air cargo route initiated.', 'completed' from shipments where tracking_no='SBG-778899-EU';

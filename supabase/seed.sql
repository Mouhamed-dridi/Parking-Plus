-- seed.sql
-- Sample data for local development

-- Users
INSERT INTO users (username, password, role, name, avatar) VALUES
  ('admin',  'admin123',  'admin',    'Admin User',   'https://randomuser.me/api/portraits/men/32.jpg'),
  ('driver', 'driver123', 'driver',   'Driver',       'https://randomuser.me/api/portraits/men/1.jpg'),
  ('opt',    'opt123',    'operator', 'Operator',     '');

-- Driver Groups
INSERT INTO driver_groups (name) VALUES ('Falcons'), ('Stallions');

-- Drivers
INSERT INTO drivers (name, email, avatar, role, region, sub_region, status, car_state, phone, license, vehicle, car_ref_id, trips, rating) VALUES
  ('Ahmed Benali',    'ahmed.benali@parkplus.com',    '/images/drivers/Ahmed.jpg',    'Super Admin',      'NewYork',    'West Bay',      'Active',   'in road', '+1 555 001 002', 'DL-2024-NY-001',  'Isuzu D-Max',     'CAR-NY-0012', 312, 4.9),
  ('Sami Khaled',     'sami.khaled@parkplus.com',     '/images/drivers/Sami.jpg',     'Admin',            'California', 'Delaware',      'Inactive', 'free',    '+1 555 002 003', 'DL-2024-CA-002',  'Ford Ranger',     'CAR-CA-0034', 198, 4.7),
  ('Yassine Morati',  'yassine.morati@parkplus.com',  '/images/drivers/Yassine.jpg',  'Supervisor',       'New Jersey', 'Maryland',      'Active',   'in road', '+1 555 003 004', 'DL-2024-NJ-003',  'Toyota Hilux',    'CAR-NJ-0056', 254, 4.8);

-- Group memberships
INSERT INTO driver_group_members (driver_id, group_id) VALUES (1, 1), (1, 2), (2, 1), (3, 1), (3, 2);

-- Cars
INSERT INTO cars (name, image, type, transmission, fuel, price, status, driver_id, driver_name, driver_avatar) VALUES
  ('GWM Tank 300 HEV 2.0 L',  '/images/cars/DGcars/gwm-tank-300.jpg', 'Car',      'Auto',   'Hybrid',  548.98, 'Free',     1, 'Ahmed Benali',  '/images/drivers/Ahmed.jpg'),
  ('Ford Transit Custom',     '/images/cars/ford-transit.jpg',         'Delivery', 'Manual', 'Diesel',  320.00, 'Free',     NULL, '', ''),
  ('Toyota Hilux 2020',       '/images/cars/toyota-hilux.jpg',         'Used',     'Manual', 'Diesel',  180.00, 'Free',     3, 'Yassine Morati', '/images/drivers/Yassine.jpg');

-- Gate movements
INSERT INTO gate_movements (vehicle_type, series_id, driver_cid, driver_name, date, time, driver_type, movement) VALUES
  ('Car',      '666 TU 3389', '12345678', 'Ahmed Benali',   CURRENT_DATE, '08:15', 'Internal', 'Entry'),
  ('Delivery', '555 TU 1245', '23456789', 'Sami Khaled',    CURRENT_DATE, '09:30', 'Internal', 'Entry'),
  ('Car',      '789 TU 4532', '45678901', 'Fares Ben Amor', CURRENT_DATE, '16:45', 'Internal', 'Exit');

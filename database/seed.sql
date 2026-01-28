-- =============================================
-- MedBook Complete Seed Data
-- 25 Doctors with Full Realistic Information
-- =============================================

-- Clear existing data (if re-seeding)
TRUNCATE TABLE appointments CASCADE;
TRUNCATE TABLE slots CASCADE;
TRUNCATE TABLE schedule_breaks CASCADE;
TRUNCATE TABLE schedules CASCADE;
TRUNCATE TABLE specialty_fields CASCADE;
TRUNCATE TABLE doctors CASCADE;

-- =============================================
-- DOCTORS (25 doctors across 7 specialties)
-- =============================================

INSERT INTO doctors (id, name, specialty, specialty_label, rating, review_count, experience, education, languages, consultation_fee, avatar, bio) VALUES

-- CARDIOLOGISTS (4)
('1', 'Dr. Sarah Mitchell', 'cardiologist', 'Cardiology', 4.9, 127, 15, 'Harvard Medical School, Residency at Massachusetts General Hospital', '["English", "Spanish"]', 250.00, 'https://randomuser.me/api/portraits/women/1.jpg', 'Board-certified cardiologist with 15 years of experience specializing in preventive cardiology, heart failure management, and cardiovascular disease prevention. Pioneer in non-invasive cardiac imaging techniques.'),

('8', 'Dr. Richard Blackwell', 'cardiologist', 'Cardiology', 4.8, 203, 22, 'Johns Hopkins School of Medicine, Fellowship at Cleveland Clinic', '["English"]', 300.00, 'https://randomuser.me/api/portraits/men/32.jpg', 'Interventional cardiologist with over two decades of experience in complex cardiac catheterization procedures, stent placements, and structural heart disease treatment. Published researcher in JACC.'),

('9', 'Dr. Lisa Wong', 'cardiologist', 'Cardiology', 4.7, 89, 11, 'Stanford University School of Medicine', '["English", "Cantonese", "Mandarin"]', 240.00, 'https://randomuser.me/api/portraits/women/44.jpg', 'Specializing in women''s heart health and cardiac arrhythmias. Fellowship trained in electrophysiology. Active member of the American Heart Association''s Go Red for Women initiative.'),

('10', 'Dr. Ahmed Hassan', 'cardiologist', 'Cardiology', 4.9, 156, 18, 'Cairo University, Fellowship at Mayo Clinic', '["English", "Arabic", "French"]', 280.00, 'https://randomuser.me/api/portraits/men/22.jpg', 'Expert in echocardiography and heart valve diseases. Internationally recognized for pioneering work in transcatheter aortic valve replacement (TAVR). Former Chief of Cardiology.'),

-- DERMATOLOGISTS (4)
('2', 'Dr. James Wilson', 'dermatologist', 'Dermatology', 4.8, 98, 12, 'Johns Hopkins University School of Medicine', '["English"]', 200.00, 'https://randomuser.me/api/portraits/men/2.jpg', 'Expert dermatologist focusing on skin cancer prevention and early detection, advanced acne treatment protocols, and cosmetic dermatology including Botox and dermal fillers.'),

('11', 'Dr. Amanda Foster', 'dermatologist', 'Dermatology', 4.9, 234, 14, 'NYU Grossman School of Medicine, Fellowship at UCSF', '["English", "Portuguese"]', 220.00, 'https://randomuser.me/api/portraits/women/28.jpg', 'Board-certified dermatologist specializing in psoriasis, eczema, and autoimmune skin conditions. Pioneer in biologic therapies for chronic skin diseases. Featured in Dermatology Times.'),

('12', 'Dr. Kevin Park', 'dermatologist', 'Dermatology', 4.6, 145, 9, 'University of Michigan Medical School', '["English", "Korean"]', 190.00, 'https://randomuser.me/api/portraits/men/55.jpg', 'Focused on pediatric dermatology and adolescent skin conditions. Expert in treating birthmarks, hemangiomas, and genetic skin disorders. Gentle approach with young patients.'),

('13', 'Dr. Rachel Green', 'dermatologist', 'Dermatology', 4.8, 178, 16, 'Columbia University Vagelos College of Physicians', '["English", "Hebrew"]', 250.00, 'https://randomuser.me/api/portraits/women/63.jpg', 'Mohs surgeon specializing in skin cancer removal with minimal scarring. Expert in melanoma detection and treatment. Trained over 50 dermatology residents in Mohs technique.'),

-- GENERAL PRACTITIONERS (4)
('3', 'Dr. Emily Chen', 'general-practitioner', 'General Practice', 4.9, 203, 10, 'Stanford University School of Medicine', '["English", "Mandarin", "Cantonese"]', 150.00, 'https://randomuser.me/api/portraits/women/3.jpg', 'Compassionate family physician providing comprehensive primary care for patients of all ages. Special interests in preventive medicine, chronic disease management, and mental health integration in primary care.'),

('14', 'Dr. Thomas Anderson', 'general-practitioner', 'General Practice', 4.7, 312, 25, 'University of Virginia School of Medicine', '["English"]', 140.00, 'https://randomuser.me/api/portraits/men/46.jpg', 'Veteran family physician with quarter-century of experience. Expert in geriatric care, diabetes management, and hypertension control. Known for building long-term relationships with multi-generational families.'),

('15', 'Dr. Maria Santos', 'general-practitioner', 'General Practice', 4.8, 187, 8, 'UCLA David Geffen School of Medicine', '["English", "Spanish", "Portuguese"]', 145.00, 'https://randomuser.me/api/portraits/women/37.jpg', 'Bilingual family physician serving diverse communities. Special focus on immigrant health, women''s wellness, and adolescent medicine. Community health advocate and volunteer.'),

('16', 'Dr. David Kim', 'general-practitioner', 'General Practice', 4.9, 267, 13, 'Duke University School of Medicine', '["English", "Korean"]', 155.00, 'https://randomuser.me/api/portraits/men/71.jpg', 'Internal medicine specialist with additional training in sports medicine. Team physician for local high school athletics. Expert in musculoskeletal injuries and exercise prescription.'),

-- ORTHOPEDIC SURGEONS (4)
('4', 'Dr. Michael Rodriguez', 'orthopedic-surgeon', 'Orthopedic Surgery', 4.7, 89, 18, 'Mayo Clinic Alix School of Medicine', '["English", "Spanish"]', 300.00, 'https://randomuser.me/api/portraits/men/4.jpg', 'Fellowship-trained orthopedic surgeon specializing in sports medicine, ACL reconstruction, and arthroscopic surgery. Team physician for professional soccer team. Pioneer in regenerative medicine applications.'),

('17', 'Dr. Jennifer Blake', 'orthopedic-surgeon', 'Orthopedic Surgery', 4.8, 134, 15, 'University of Pennsylvania Perelman School of Medicine', '["English", "German"]', 320.00, 'https://randomuser.me/api/portraits/women/52.jpg', 'Hip and knee replacement specialist with expertise in robotic-assisted surgery. Over 2,000 successful joint replacements performed. Focused on rapid recovery protocols and outpatient joint replacement.'),

('18', 'Dr. Christopher Lee', 'orthopedic-surgeon', 'Orthopedic Surgery', 4.6, 98, 12, 'Washington University School of Medicine', '["English", "Mandarin"]', 290.00, 'https://randomuser.me/api/portraits/men/36.jpg', 'Hand and upper extremity surgeon treating carpal tunnel, trigger finger, and complex hand injuries. Microsurgery trained for nerve and tendon repairs. Occupational injury specialist.'),

('19', 'Dr. Stephanie Moore', 'orthopedic-surgeon', 'Orthopedic Surgery', 4.9, 167, 20, 'Northwestern University Feinberg School of Medicine', '["English", "French"]', 350.00, 'https://randomuser.me/api/portraits/women/68.jpg', 'Spine surgeon specializing in minimally invasive techniques for herniated discs, spinal stenosis, and degenerative conditions. Leader in outpatient spine surgery movement. Published author of spine surgery textbook.'),

-- NEUROLOGISTS (3)
('5', 'Dr. Olivia Thompson', 'neurologist', 'Neurology', 4.8, 76, 14, 'Yale School of Medicine, Fellowship at UCSF', '["English", "French"]', 280.00, 'https://randomuser.me/api/portraits/women/5.jpg', 'Board-certified neurologist with expertise in headache medicine, including migraine and cluster headaches. Also specializes in epilepsy management and seizure disorders. Certified in Botox for chronic migraine.'),

('20', 'Dr. William Chang', 'neurologist', 'Neurology', 4.9, 145, 19, 'Columbia University Vagelos College of Physicians', '["English", "Mandarin", "Taiwanese"]', 300.00, 'https://randomuser.me/api/portraits/men/58.jpg', 'Movement disorder specialist focusing on Parkinson''s disease, essential tremor, and dystonia. Expert in deep brain stimulation programming. Research focus on neuroprotective therapies.'),

('21', 'Dr. Elizabeth Turner', 'neurologist', 'Neurology', 4.7, 112, 11, 'Emory University School of Medicine', '["English", "Spanish"]', 270.00, 'https://randomuser.me/api/portraits/women/42.jpg', 'Multiple sclerosis specialist with expertise in neuroimmunology. Clinical trials investigator for novel MS therapies. Patient advocate for neurological disability support.'),

-- GASTROENTEROLOGISTS (3)
('6', 'Dr. Robert Patel', 'gastroenterologist', 'Gastroenterology', 4.6, 112, 16, 'University of Pennsylvania Perelman School of Medicine', '["English", "Hindi", "Gujarati"]', 260.00, 'https://randomuser.me/api/portraits/men/6.jpg', 'Gastroenterologist specializing in inflammatory bowel disease (Crohn''s and ulcerative colitis), liver diseases including fatty liver, and advanced endoscopic procedures including ERCP.'),

('22', 'Dr. Susan O''Brien', 'gastroenterologist', 'Gastroenterology', 4.8, 189, 21, 'University of Chicago Pritzker School of Medicine', '["English", "Irish"]', 280.00, 'https://randomuser.me/api/portraits/women/49.jpg', 'Hepatologist with expertise in viral hepatitis, cirrhosis, and liver transplant evaluation. Director of liver clinic. Special interest in non-alcoholic fatty liver disease epidemic.'),

('23', 'Dr. Andrew Nguyen', 'gastroenterologist', 'Gastroenterology', 4.7, 134, 10, 'Baylor College of Medicine', '["English", "Vietnamese"]', 250.00, 'https://randomuser.me/api/portraits/men/64.jpg', 'Advanced endoscopist specializing in therapeutic procedures including ESD, POEM, and bariatric endoscopy. Pioneer in third-space endoscopy techniques. High-volume colonoscopy screener.'),

-- PEDIATRICIANS (3)
('7', 'Dr. Jennifer Martinez', 'pediatrician', 'Pediatrics', 4.9, 156, 11, 'Columbia University Vagelos College of Physicians', '["English", "Spanish"]', 180.00, 'https://randomuser.me/api/portraits/women/7.jpg', 'Dedicated pediatrician providing comprehensive care for children from birth through adolescence. Special interests in developmental pediatrics, childhood nutrition, and vaccine education. Parent communication champion.'),

('24', 'Dr. Marcus Johnson', 'pediatrician', 'Pediatrics', 4.8, 223, 17, 'University of Michigan Medical School', '["English"]', 175.00, 'https://randomuser.me/api/portraits/men/41.jpg', 'Pediatric hospitalist with clinic practice. Expert in acute childhood illnesses, asthma management, and ADHD evaluation. School health consultant. Coach for pediatric residents.'),

('25', 'Dr. Christina Reyes', 'pediatrician', 'Pediatrics', 4.9, 198, 9, 'University of Texas Southwestern Medical Center', '["English", "Spanish", "Tagalog"]', 170.00, 'https://randomuser.me/api/portraits/women/33.jpg', 'Newborn care specialist with additional training in lactation support. Focus on first-year wellness, breastfeeding challenges, and postpartum family support. Bilingual practice serving diverse families.');

-- =============================================
-- SCHEDULES (Working hours for all 25 doctors)
-- =============================================

-- Doctor 1 - Dr. Sarah Mitchell (Cardiologist)
INSERT INTO schedules (doctor_id, day_of_week, start_time, end_time, is_working) VALUES
('1', 1, '09:00', '17:00', true), ('1', 2, '09:00', '17:00', true), ('1', 3, '09:00', '13:00', true),
('1', 4, '09:00', '17:00', true), ('1', 5, '09:00', '15:00', true), ('1', 0, NULL, NULL, false), ('1', 6, NULL, NULL, false);

-- Doctor 2 - Dr. James Wilson (Dermatologist)
INSERT INTO schedules (doctor_id, day_of_week, start_time, end_time, is_working) VALUES
('2', 1, '08:00', '16:00', true), ('2', 2, '08:00', '16:00', true), ('2', 3, '08:00', '16:00', true),
('2', 4, '08:00', '16:00', true), ('2', 5, '08:00', '14:00', true), ('2', 0, NULL, NULL, false), ('2', 6, NULL, NULL, false);

-- Doctor 3 - Dr. Emily Chen (General Practitioner)
INSERT INTO schedules (doctor_id, day_of_week, start_time, end_time, is_working) VALUES
('3', 1, '08:30', '17:30', true), ('3', 2, '08:30', '17:30', true), ('3', 3, '08:30', '17:30', true),
('3', 4, '08:30', '17:30', true), ('3', 5, '08:30', '16:00', true), ('3', 0, NULL, NULL, false), ('3', 6, '09:00', '12:00', true);

-- Doctor 4 - Dr. Michael Rodriguez (Orthopedic)
INSERT INTO schedules (doctor_id, day_of_week, start_time, end_time, is_working) VALUES
('4', 1, '07:00', '15:00', true), ('4', 2, '07:00', '15:00', true), ('4', 3, NULL, NULL, false),
('4', 4, '07:00', '15:00', true), ('4', 5, '07:00', '12:00', true), ('4', 0, NULL, NULL, false), ('4', 6, NULL, NULL, false);

-- Doctor 5 - Dr. Olivia Thompson (Neurologist)
INSERT INTO schedules (doctor_id, day_of_week, start_time, end_time, is_working) VALUES
('5', 1, '09:00', '17:00', true), ('5', 2, '09:00', '17:00', true), ('5', 3, '09:00', '17:00', true),
('5', 4, '09:00', '17:00', true), ('5', 5, NULL, NULL, false), ('5', 0, NULL, NULL, false), ('5', 6, NULL, NULL, false);

-- Doctor 6 - Dr. Robert Patel (Gastroenterologist)
INSERT INTO schedules (doctor_id, day_of_week, start_time, end_time, is_working) VALUES
('6', 1, '08:00', '16:00', true), ('6', 2, '08:00', '16:00', true), ('6', 3, '10:00', '18:00', true),
('6', 4, '08:00', '16:00', true), ('6', 5, '08:00', '14:00', true), ('6', 0, NULL, NULL, false), ('6', 6, NULL, NULL, false);

-- Doctor 7 - Dr. Jennifer Martinez (Pediatrician)
INSERT INTO schedules (doctor_id, day_of_week, start_time, end_time, is_working) VALUES
('7', 1, '08:00', '17:00', true), ('7', 2, '08:00', '17:00', true), ('7', 3, '08:00', '17:00', true),
('7', 4, '08:00', '17:00', true), ('7', 5, '08:00', '15:00', true), ('7', 0, NULL, NULL, false), ('7', 6, '09:00', '13:00', true);

-- Doctor 8 - Dr. Richard Blackwell (Cardiologist)
INSERT INTO schedules (doctor_id, day_of_week, start_time, end_time, is_working) VALUES
('8', 1, '07:30', '15:30', true), ('8', 2, '07:30', '15:30', true), ('8', 3, '07:30', '15:30', true),
('8', 4, '07:30', '15:30', true), ('8', 5, NULL, NULL, false), ('8', 0, NULL, NULL, false), ('8', 6, NULL, NULL, false);

-- Doctor 9 - Dr. Lisa Wong (Cardiologist)
INSERT INTO schedules (doctor_id, day_of_week, start_time, end_time, is_working) VALUES
('9', 1, '10:00', '18:00', true), ('9', 2, '10:00', '18:00', true), ('9', 3, NULL, NULL, false),
('9', 4, '10:00', '18:00', true), ('9', 5, '10:00', '16:00', true), ('9', 0, NULL, NULL, false), ('9', 6, NULL, NULL, false);

-- Doctor 10 - Dr. Ahmed Hassan (Cardiologist)
INSERT INTO schedules (doctor_id, day_of_week, start_time, end_time, is_working) VALUES
('10', 1, '08:00', '16:00', true), ('10', 2, '08:00', '16:00', true), ('10', 3, '08:00', '16:00', true),
('10', 4, '08:00', '16:00', true), ('10', 5, '08:00', '13:00', true), ('10', 0, NULL, NULL, false), ('10', 6, NULL, NULL, false);

-- Doctor 11 - Dr. Amanda Foster (Dermatologist)
INSERT INTO schedules (doctor_id, day_of_week, start_time, end_time, is_working) VALUES
('11', 1, '09:00', '17:00', true), ('11', 2, '09:00', '17:00', true), ('11', 3, '09:00', '17:00', true),
('11', 4, '09:00', '17:00', true), ('11', 5, '09:00', '14:00', true), ('11', 0, NULL, NULL, false), ('11', 6, NULL, NULL, false);

-- Doctor 12 - Dr. Kevin Park (Dermatologist)
INSERT INTO schedules (doctor_id, day_of_week, start_time, end_time, is_working) VALUES
('12', 1, '08:30', '16:30', true), ('12', 2, '08:30', '16:30', true), ('12', 3, '08:30', '16:30', true),
('12', 4, NULL, NULL, false), ('12', 5, '08:30', '15:00', true), ('12', 0, NULL, NULL, false), ('12', 6, NULL, NULL, false);

-- Doctor 13 - Dr. Rachel Green (Dermatologist)
INSERT INTO schedules (doctor_id, day_of_week, start_time, end_time, is_working) VALUES
('13', 1, '07:00', '15:00', true), ('13', 2, '07:00', '15:00', true), ('13', 3, '07:00', '15:00', true),
('13', 4, '07:00', '15:00', true), ('13', 5, '07:00', '12:00', true), ('13', 0, NULL, NULL, false), ('13', 6, NULL, NULL, false);

-- Doctor 14 - Dr. Thomas Anderson (General Practitioner)
INSERT INTO schedules (doctor_id, day_of_week, start_time, end_time, is_working) VALUES
('14', 1, '08:00', '17:00', true), ('14', 2, '08:00', '17:00', true), ('14', 3, '08:00', '17:00', true),
('14', 4, '08:00', '17:00', true), ('14', 5, '08:00', '16:00', true), ('14', 0, NULL, NULL, false), ('14', 6, NULL, NULL, false);

-- Doctor 15 - Dr. Maria Santos (General Practitioner)
INSERT INTO schedules (doctor_id, day_of_week, start_time, end_time, is_working) VALUES
('15', 1, '09:00', '18:00', true), ('15', 2, '09:00', '18:00', true), ('15', 3, NULL, NULL, false),
('15', 4, '09:00', '18:00', true), ('15', 5, '09:00', '17:00', true), ('15', 0, NULL, NULL, false), ('15', 6, '10:00', '14:00', true);

-- Doctor 16 - Dr. David Kim (General Practitioner)
INSERT INTO schedules (doctor_id, day_of_week, start_time, end_time, is_working) VALUES
('16', 1, '07:30', '16:30', true), ('16', 2, '07:30', '16:30', true), ('16', 3, '07:30', '16:30', true),
('16', 4, '07:30', '16:30', true), ('16', 5, '07:30', '14:00', true), ('16', 0, NULL, NULL, false), ('16', 6, NULL, NULL, false);

-- Doctor 17 - Dr. Jennifer Blake (Orthopedic)
INSERT INTO schedules (doctor_id, day_of_week, start_time, end_time, is_working) VALUES
('17', 1, '06:30', '14:30', true), ('17', 2, '06:30', '14:30', true), ('17', 3, '06:30', '14:30', true),
('17', 4, NULL, NULL, false), ('17', 5, '06:30', '12:00', true), ('17', 0, NULL, NULL, false), ('17', 6, NULL, NULL, false);

-- Doctor 18 - Dr. Christopher Lee (Orthopedic)
INSERT INTO schedules (doctor_id, day_of_week, start_time, end_time, is_working) VALUES
('18', 1, '08:00', '16:00', true), ('18', 2, '08:00', '16:00', true), ('18', 3, '08:00', '16:00', true),
('18', 4, '08:00', '16:00', true), ('18', 5, NULL, NULL, false), ('18', 0, NULL, NULL, false), ('18', 6, NULL, NULL, false);

-- Doctor 19 - Dr. Stephanie Moore (Orthopedic)
INSERT INTO schedules (doctor_id, day_of_week, start_time, end_time, is_working) VALUES
('19', 1, '07:00', '15:00', true), ('19', 2, NULL, NULL, false), ('19', 3, '07:00', '15:00', true),
('19', 4, '07:00', '15:00', true), ('19', 5, '07:00', '13:00', true), ('19', 0, NULL, NULL, false), ('19', 6, NULL, NULL, false);

-- Doctor 20 - Dr. William Chang (Neurologist)
INSERT INTO schedules (doctor_id, day_of_week, start_time, end_time, is_working) VALUES
('20', 1, '09:00', '17:00', true), ('20', 2, '09:00', '17:00', true), ('20', 3, '09:00', '17:00', true),
('20', 4, '09:00', '17:00', true), ('20', 5, '09:00', '14:00', true), ('20', 0, NULL, NULL, false), ('20', 6, NULL, NULL, false);

-- Doctor 21 - Dr. Elizabeth Turner (Neurologist)
INSERT INTO schedules (doctor_id, day_of_week, start_time, end_time, is_working) VALUES
('21', 1, '08:30', '16:30', true), ('21', 2, '08:30', '16:30', true), ('21', 3, NULL, NULL, false),
('21', 4, '08:30', '16:30', true), ('21', 5, '08:30', '15:00', true), ('21', 0, NULL, NULL, false), ('21', 6, NULL, NULL, false);

-- Doctor 22 - Dr. Susan O'Brien (Gastroenterologist)
INSERT INTO schedules (doctor_id, day_of_week, start_time, end_time, is_working) VALUES
('22', 1, '07:00', '15:00', true), ('22', 2, '07:00', '15:00', true), ('22', 3, '07:00', '15:00', true),
('22', 4, '07:00', '15:00', true), ('22', 5, NULL, NULL, false), ('22', 0, NULL, NULL, false), ('22', 6, NULL, NULL, false);

-- Doctor 23 - Dr. Andrew Nguyen (Gastroenterologist)
INSERT INTO schedules (doctor_id, day_of_week, start_time, end_time, is_working) VALUES
('23', 1, '08:00', '16:00', true), ('23', 2, '08:00', '16:00', true), ('23', 3, '10:00', '18:00', true),
('23', 4, '08:00', '16:00', true), ('23', 5, '08:00', '14:00', true), ('23', 0, NULL, NULL, false), ('23', 6, NULL, NULL, false);

-- Doctor 24 - Dr. Marcus Johnson (Pediatrician)
INSERT INTO schedules (doctor_id, day_of_week, start_time, end_time, is_working) VALUES
('24', 1, '08:00', '17:00', true), ('24', 2, '08:00', '17:00', true), ('24', 3, '08:00', '17:00', true),
('24', 4, '08:00', '17:00', true), ('24', 5, '08:00', '15:00', true), ('24', 0, NULL, NULL, false), ('24', 6, '09:00', '12:00', true);

-- Doctor 25 - Dr. Christina Reyes (Pediatrician)
INSERT INTO schedules (doctor_id, day_of_week, start_time, end_time, is_working) VALUES
('25', 1, '09:00', '18:00', true), ('25', 2, '09:00', '18:00', true), ('25', 3, '09:00', '18:00', true),
('25', 4, NULL, NULL, false), ('25', 5, '09:00', '16:00', true), ('25', 0, NULL, NULL, false), ('25', 6, '10:00', '14:00', true);


-- =============================================
-- SCHEDULE BREAKS (Lunch breaks)
-- =============================================

INSERT INTO schedule_breaks (doctor_id, day_of_week, start_time, end_time, label) VALUES
('1', NULL, '12:00', '13:00', 'Lunch'),
('2', NULL, '12:00', '12:30', 'Lunch'),
('3', NULL, '12:30', '13:30', 'Lunch'),
('4', NULL, '11:30', '12:00', 'Lunch'),
('5', NULL, '12:00', '13:00', 'Lunch'),
('6', NULL, '12:00', '13:00', 'Lunch'),
('7', NULL, '12:00', '13:00', 'Lunch'),
('8', NULL, '11:30', '12:00', 'Lunch'),
('9', NULL, '13:00', '14:00', 'Lunch'),
('10', NULL, '12:00', '12:30', 'Lunch'),
('11', NULL, '12:00', '13:00', 'Lunch'),
('12', NULL, '12:00', '12:30', 'Lunch'),
('13', NULL, '11:00', '11:30', 'Lunch'),
('14', NULL, '12:00', '13:00', 'Lunch'),
('15', NULL, '13:00', '14:00', 'Lunch'),
('16', NULL, '12:00', '12:30', 'Lunch'),
('17', NULL, '11:00', '11:30', 'Lunch'),
('18', NULL, '12:00', '12:30', 'Lunch'),
('19', NULL, '11:30', '12:00', 'Lunch'),
('20', NULL, '12:00', '13:00', 'Lunch'),
('21', NULL, '12:00', '12:30', 'Lunch'),
('22', NULL, '11:00', '11:30', 'Lunch'),
('23', NULL, '12:00', '13:00', 'Lunch'),
('24', NULL, '12:00', '13:00', 'Lunch'),
('25', NULL, '13:00', '14:00', 'Lunch');


-- =============================================
-- SPECIALTY FIELDS (Dynamic booking fields per specialty)
-- =============================================

-- Common required fields for ALL specialties
INSERT INTO specialty_fields (specialty, field_id, field_type, label, is_required, ai_hint, field_category, display_order) VALUES
('cardiologist', 'firstName', 'text', 'First Name', true, 'Patient''s first/given name', 'required', 1),
('cardiologist', 'lastName', 'text', 'Last Name', true, 'Patient''s last/family name', 'required', 2),
('cardiologist', 'email', 'email', 'Email Address', true, 'Email for appointment confirmation and medical records', 'required', 3),
('cardiologist', 'phone', 'phone', 'Phone Number', true, 'Contact phone number for appointment reminders', 'required', 4),
('cardiologist', 'dateOfBirth', 'date', 'Date of Birth', true, 'Patient''s date of birth for medical records', 'required', 5),
('cardiologist', 'reason', 'text', 'Reason for Visit', true, 'Brief description of why you need this appointment', 'required', 6);

-- Cardiologist-specific fields
INSERT INTO specialty_fields (specialty, field_id, field_type, label, is_required, ai_hint, field_category, display_order) VALUES
('cardiologist', 'chestPain', 'boolean', 'Experiencing chest pain or discomfort?', false, 'Does the patient have any chest pain, pressure, or discomfort?', 'optional', 10),
('cardiologist', 'shortnessOfBreath', 'boolean', 'Shortness of breath?', false, 'Does the patient experience difficulty breathing or shortness of breath?', 'optional', 11),
('cardiologist', 'palpitations', 'boolean', 'Heart palpitations or irregular heartbeat?', false, 'Does the patient notice their heart racing, skipping beats, or beating irregularly?', 'optional', 12),
('cardiologist', 'bloodPressure', 'text', 'Recent Blood Pressure Reading', false, 'Most recent blood pressure reading if known (e.g., 120/80 mmHg)', 'optional', 13),
('cardiologist', 'cholesterolLevel', 'text', 'Recent Cholesterol Level', false, 'Most recent cholesterol level if known (total or LDL)', 'optional', 14),
('cardiologist', 'familyHeartHistory', 'boolean', 'Family history of heart disease?', false, 'Do any immediate family members have heart disease, heart attacks, or strokes?', 'optional', 15),
('cardiologist', 'smoking', 'select', 'Smoking Status', false, 'Patient''s smoking history', 'optional', 16),
('cardiologist', 'exerciseFrequency', 'select', 'Exercise Frequency', false, 'How often does the patient exercise?', 'optional', 17),
('cardiologist', 'currentMedications', 'textarea', 'Current Medications', false, 'List all current medications including dosages', 'optional', 20),
('cardiologist', 'allergies', 'textarea', 'Known Allergies', false, 'Any known allergies to medications or substances', 'optional', 21);

-- Dermatologist fields
INSERT INTO specialty_fields (specialty, field_id, field_type, label, is_required, ai_hint, field_category, display_order) VALUES
('dermatologist', 'firstName', 'text', 'First Name', true, 'Patient''s first/given name', 'required', 1),
('dermatologist', 'lastName', 'text', 'Last Name', true, 'Patient''s last/family name', 'required', 2),
('dermatologist', 'email', 'email', 'Email Address', true, 'Email for appointment confirmation', 'required', 3),
('dermatologist', 'phone', 'phone', 'Phone Number', true, 'Contact phone number', 'required', 4),
('dermatologist', 'dateOfBirth', 'date', 'Date of Birth', true, 'Patient''s date of birth', 'required', 5),
('dermatologist', 'reason', 'text', 'Reason for Visit', true, 'Brief description of your skin concern', 'required', 6),
('dermatologist', 'affectedArea', 'text', 'Affected Body Area', false, 'Which part(s) of the body are affected? (e.g., face, arms, back, scalp)', 'optional', 10),
('dermatologist', 'symptomDuration', 'select', 'How long have you had this condition?', false, 'Duration of the skin condition', 'optional', 11),
('dermatologist', 'itching', 'boolean', 'Is there itching?', false, 'Does the affected area itch?', 'optional', 12),
('dermatologist', 'pain', 'boolean', 'Is there pain or tenderness?', false, 'Is the affected area painful or tender to touch?', 'optional', 13),
('dermatologist', 'spreading', 'boolean', 'Is it spreading?', false, 'Has the condition been spreading to other areas?', 'optional', 14),
('dermatologist', 'previousTreatments', 'textarea', 'Previous treatments tried', false, 'Any creams, medications, or treatments already tried for this condition', 'optional', 15),
('dermatologist', 'skinCancerHistory', 'boolean', 'History of skin cancer?', false, 'Has the patient or family members had skin cancer?', 'optional', 16),
('dermatologist', 'sunExposure', 'select', 'Sun exposure level', false, 'How much sun exposure does the patient typically get?', 'optional', 17),
('dermatologist', 'allergies', 'textarea', 'Known Allergies', false, 'Any known allergies especially to topical products', 'optional', 20);

-- General Practitioner fields
INSERT INTO specialty_fields (specialty, field_id, field_type, label, is_required, ai_hint, field_category, display_order) VALUES
('general-practitioner', 'firstName', 'text', 'First Name', true, 'Patient''s first/given name', 'required', 1),
('general-practitioner', 'lastName', 'text', 'Last Name', true, 'Patient''s last/family name', 'required', 2),
('general-practitioner', 'email', 'email', 'Email Address', true, 'Email for appointment confirmation', 'required', 3),
('general-practitioner', 'phone', 'phone', 'Phone Number', true, 'Contact phone number', 'required', 4),
('general-practitioner', 'dateOfBirth', 'date', 'Date of Birth', true, 'Patient''s date of birth', 'required', 5),
('general-practitioner', 'reason', 'text', 'Reason for Visit', true, 'Main reason for scheduling this appointment', 'required', 6),
('general-practitioner', 'chiefComplaint', 'textarea', 'Describe your main health concern', false, 'Detailed description of the primary symptoms or concerns', 'optional', 10),
('general-practitioner', 'symptomDuration', 'select', 'How long have you had these symptoms?', false, 'Duration of current symptoms', 'optional', 11),
('general-practitioner', 'fever', 'boolean', 'Do you have a fever?', false, 'Is the patient currently experiencing fever?', 'optional', 12),
('general-practitioner', 'temperature', 'text', 'Temperature if measured', false, 'Body temperature reading if measured (e.g., 101.5°F)', 'optional', 13),
('general-practitioner', 'cough', 'boolean', 'Do you have a cough?', false, 'Is the patient experiencing cough?', 'optional', 14),
('general-practitioner', 'fatigue', 'boolean', 'Unusual fatigue or weakness?', false, 'Is the patient feeling unusually tired or weak?', 'optional', 15),
('general-practitioner', 'recentTravel', 'boolean', 'Recent travel in past 14 days?', false, 'Has the patient traveled recently?', 'optional', 16),
('general-practitioner', 'currentMedications', 'textarea', 'Current Medications', false, 'List all current medications including over-the-counter', 'optional', 20),
('general-practitioner', 'allergies', 'textarea', 'Known Allergies', false, 'Any known allergies to medications, food, or environmental factors', 'optional', 21),
('general-practitioner', 'chronicConditions', 'textarea', 'Chronic Conditions', false, 'Any ongoing chronic conditions (diabetes, hypertension, etc.)', 'optional', 22);

-- Orthopedic Surgeon fields
INSERT INTO specialty_fields (specialty, field_id, field_type, label, is_required, ai_hint, field_category, display_order) VALUES
('orthopedic-surgeon', 'firstName', 'text', 'First Name', true, 'Patient''s first/given name', 'required', 1),
('orthopedic-surgeon', 'lastName', 'text', 'Last Name', true, 'Patient''s last/family name', 'required', 2),
('orthopedic-surgeon', 'email', 'email', 'Email Address', true, 'Email for appointment confirmation', 'required', 3),
('orthopedic-surgeon', 'phone', 'phone', 'Phone Number', true, 'Contact phone number', 'required', 4),
('orthopedic-surgeon', 'dateOfBirth', 'date', 'Date of Birth', true, 'Patient''s date of birth', 'required', 5),
('orthopedic-surgeon', 'reason', 'text', 'Reason for Visit', true, 'Brief description of your orthopedic concern', 'required', 6),
('orthopedic-surgeon', 'injuryLocation', 'select', 'Location of Pain/Injury', false, 'Which part of the body is affected?', 'optional', 10),
('orthopedic-surgeon', 'painLevel', 'select', 'Pain Level (1-10)', false, 'Rate your current pain level from 1 (minimal) to 10 (severe)', 'optional', 11),
('orthopedic-surgeon', 'injuryDate', 'date', 'When did the injury/pain start?', false, 'Date when injury occurred or pain began', 'optional', 12),
('orthopedic-surgeon', 'injuryMechanism', 'textarea', 'How did the injury occur?', false, 'Describe how the injury happened or what triggered the pain', 'optional', 13),
('orthopedic-surgeon', 'swelling', 'boolean', 'Is there swelling?', false, 'Is the affected area swollen?', 'optional', 14),
('orthopedic-surgeon', 'limitedMobility', 'boolean', 'Limited range of motion?', false, 'Is movement restricted in the affected area?', 'optional', 15),
('orthopedic-surgeon', 'previousInjuries', 'textarea', 'Previous injuries to this area', false, 'Any previous injuries or surgeries to the same area', 'optional', 16),
('orthopedic-surgeon', 'imagingDone', 'boolean', 'Have you had X-rays or MRI?', false, 'Has any imaging been done for this condition?', 'optional', 17),
('orthopedic-surgeon', 'physicalActivityLevel', 'select', 'Physical activity level', false, 'How physically active is the patient?', 'optional', 18),
('orthopedic-surgeon', 'currentMedications', 'textarea', 'Current Medications', false, 'List current medications including pain relievers', 'optional', 20),
('orthopedic-surgeon', 'allergies', 'textarea', 'Known Allergies', false, 'Any known allergies', 'optional', 21);

-- Neurologist fields
INSERT INTO specialty_fields (specialty, field_id, field_type, label, is_required, ai_hint, field_category, display_order) VALUES
('neurologist', 'firstName', 'text', 'First Name', true, 'Patient''s first/given name', 'required', 1),
('neurologist', 'lastName', 'text', 'Last Name', true, 'Patient''s last/family name', 'required', 2),
('neurologist', 'email', 'email', 'Email Address', true, 'Email for appointment confirmation', 'required', 3),
('neurologist', 'phone', 'phone', 'Phone Number', true, 'Contact phone number', 'required', 4),
('neurologist', 'dateOfBirth', 'date', 'Date of Birth', true, 'Patient''s date of birth', 'required', 5),
('neurologist', 'reason', 'text', 'Reason for Visit', true, 'Brief description of your neurological concern', 'required', 6),
('neurologist', 'headaches', 'boolean', 'Do you experience headaches?', false, 'Does the patient suffer from headaches or migraines?', 'optional', 10),
('neurologist', 'headacheFrequency', 'select', 'Headache frequency', false, 'How often do headaches occur?', 'optional', 11),
('neurologist', 'dizziness', 'boolean', 'Dizziness or vertigo?', false, 'Does the patient experience dizziness or spinning sensations?', 'optional', 12),
('neurologist', 'numbnessTingling', 'boolean', 'Numbness or tingling?', false, 'Any numbness or tingling in hands, feet, or other areas?', 'optional', 13),
('neurologist', 'memoryIssues', 'boolean', 'Memory or concentration issues?', false, 'Any problems with memory, focus, or thinking clearly?', 'optional', 14),
('neurologist', 'seizures', 'boolean', 'History of seizures?', false, 'Has the patient ever had seizures or epilepsy?', 'optional', 15),
('neurologist', 'sleepProblems', 'boolean', 'Sleep problems?', false, 'Any issues with sleep quality or sleep disorders?', 'optional', 16),
('neurologist', 'tremors', 'boolean', 'Tremors or involuntary movements?', false, 'Any shaking, tremors, or involuntary movements?', 'optional', 17),
('neurologist', 'familyNeuroHistory', 'boolean', 'Family history of neurological conditions?', false, 'Do family members have conditions like Parkinson''s, Alzheimer''s, MS, or epilepsy?', 'optional', 18),
('neurologist', 'currentMedications', 'textarea', 'Current Medications', false, 'List all current medications', 'optional', 20),
('neurologist', 'allergies', 'textarea', 'Known Allergies', false, 'Any known allergies', 'optional', 21);

-- Gastroenterologist fields
INSERT INTO specialty_fields (specialty, field_id, field_type, label, is_required, ai_hint, field_category, display_order) VALUES
('gastroenterologist', 'firstName', 'text', 'First Name', true, 'Patient''s first/given name', 'required', 1),
('gastroenterologist', 'lastName', 'text', 'Last Name', true, 'Patient''s last/family name', 'required', 2),
('gastroenterologist', 'email', 'email', 'Email Address', true, 'Email for appointment confirmation', 'required', 3),
('gastroenterologist', 'phone', 'phone', 'Phone Number', true, 'Contact phone number', 'required', 4),
('gastroenterologist', 'dateOfBirth', 'date', 'Date of Birth', true, 'Patient''s date of birth', 'required', 5),
('gastroenterologist', 'reason', 'text', 'Reason for Visit', true, 'Brief description of your digestive concern', 'required', 6),
('gastroenterologist', 'abdominalPain', 'boolean', 'Abdominal pain?', false, 'Is the patient experiencing stomach or abdominal pain?', 'optional', 10),
('gastroenterologist', 'painLocation', 'select', 'Where is the pain located?', false, 'Location of abdominal pain', 'optional', 11),
('gastroenterologist', 'nausea', 'boolean', 'Nausea or vomiting?', false, 'Does the patient experience nausea or vomiting?', 'optional', 12),
('gastroenterologist', 'bowelChanges', 'boolean', 'Changes in bowel habits?', false, 'Any changes in frequency or consistency of bowel movements?', 'optional', 13),
('gastroenterologist', 'bloodInStool', 'boolean', 'Blood in stool?', false, 'Has there been any blood in bowel movements?', 'optional', 14),
('gastroenterologist', 'heartburn', 'boolean', 'Heartburn or acid reflux?', false, 'Does the patient experience heartburn or acid reflux?', 'optional', 15),
('gastroenterologist', 'weightChange', 'boolean', 'Unintentional weight change?', false, 'Any unexplained weight loss or gain?', 'optional', 16),
('gastroenterologist', 'appetiteChange', 'boolean', 'Change in appetite?', false, 'Any significant change in appetite?', 'optional', 17),
('gastroenterologist', 'previousEndoscopy', 'boolean', 'Previous endoscopy or colonoscopy?', false, 'Has the patient had any previous GI procedures?', 'optional', 18),
('gastroenterologist', 'familyGIHistory', 'boolean', 'Family history of GI conditions?', false, 'Family history of colon cancer, Crohn''s, colitis, or other GI diseases?', 'optional', 19),
('gastroenterologist', 'currentMedications', 'textarea', 'Current Medications', false, 'List all current medications', 'optional', 20),
('gastroenterologist', 'allergies', 'textarea', 'Known Allergies', false, 'Any known allergies', 'optional', 21);

-- Pediatrician fields
INSERT INTO specialty_fields (specialty, field_id, field_type, label, is_required, ai_hint, field_category, display_order) VALUES
('pediatrician', 'childFirstName', 'text', 'Child''s First Name', true, 'The child patient''s first name', 'required', 1),
('pediatrician', 'childLastName', 'text', 'Child''s Last Name', true, 'The child patient''s last name', 'required', 2),
('pediatrician', 'childDateOfBirth', 'date', 'Child''s Date of Birth', true, 'The child''s date of birth', 'required', 3),
('pediatrician', 'parentName', 'text', 'Parent/Guardian Name', true, 'Name of parent or legal guardian', 'required', 4),
('pediatrician', 'email', 'email', 'Parent''s Email', true, 'Email for appointment confirmation', 'required', 5),
('pediatrician', 'phone', 'phone', 'Parent''s Phone', true, 'Contact phone number', 'required', 6),
('pediatrician', 'reason', 'text', 'Reason for Visit', true, 'Brief description of the visit reason', 'required', 7),
('pediatrician', 'visitType', 'select', 'Type of Visit', false, 'Is this a well-child visit or sick visit?', 'optional', 10),
('pediatrician', 'symptoms', 'textarea', 'Current Symptoms', false, 'Describe any current symptoms the child is experiencing', 'optional', 11),
('pediatrician', 'symptomDuration', 'select', 'How long has the child had symptoms?', false, 'Duration of current symptoms', 'optional', 12),
('pediatrician', 'fever', 'boolean', 'Does the child have a fever?', false, 'Is the child currently running a fever?', 'optional', 13),
('pediatrician', 'temperature', 'text', 'Temperature if measured', false, 'Child''s temperature reading', 'optional', 14),
('pediatrician', 'appetite', 'select', 'How is the child''s appetite?', false, 'Is the child eating normally?', 'optional', 15),
('pediatrician', 'sleepPattern', 'select', 'How is the child sleeping?', false, 'Any changes in the child''s sleep pattern?', 'optional', 16),
('pediatrician', 'vaccinationsUpToDate', 'boolean', 'Are vaccinations up to date?', false, 'Is the child current on all recommended vaccinations?', 'optional', 17),
('pediatrician', 'knownAllergies', 'textarea', 'Known Allergies', false, 'Any known allergies (food, medication, environmental)', 'optional', 20),
('pediatrician', 'currentMedications', 'textarea', 'Current Medications', false, 'Any medications the child is currently taking', 'optional', 21);


-- Add options for select fields (as JSON in a separate update or handle in application)
UPDATE specialty_fields SET options = '["Never smoked", "Former smoker", "Current smoker"]' WHERE field_id = 'smoking';
UPDATE specialty_fields SET options = '["Sedentary", "Light (1-2 days/week)", "Moderate (3-4 days/week)", "Active (5+ days/week)"]' WHERE field_id = 'exerciseFrequency';
UPDATE specialty_fields SET options = '["Less than 1 week", "1-2 weeks", "2-4 weeks", "1-3 months", "More than 3 months"]' WHERE field_id = 'symptomDuration' AND specialty IN ('dermatologist', 'general-practitioner', 'pediatrician');
UPDATE specialty_fields SET options = '["Minimal", "Moderate (few hours/week)", "Significant (daily outdoor activity)", "Extensive (outdoor work)"]' WHERE field_id = 'sunExposure';
UPDATE specialty_fields SET options = '["Shoulder", "Elbow", "Wrist/Hand", "Hip", "Knee", "Ankle/Foot", "Upper Back", "Lower Back", "Neck", "Other"]' WHERE field_id = 'injuryLocation';
UPDATE specialty_fields SET options = '["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]' WHERE field_id = 'painLevel';
UPDATE specialty_fields SET options = '["Sedentary", "Light activity", "Moderate activity", "Very active", "Competitive athlete"]' WHERE field_id = 'physicalActivityLevel';
UPDATE specialty_fields SET options = '["Rarely (few per year)", "Monthly", "Weekly", "Several times per week", "Daily"]' WHERE field_id = 'headacheFrequency';
UPDATE specialty_fields SET options = '["Upper abdomen", "Lower abdomen", "Right side", "Left side", "Around navel", "Entire abdomen"]' WHERE field_id = 'painLocation';
UPDATE specialty_fields SET options = '["Well-child checkup", "Sick visit", "Follow-up", "Vaccination", "Other"]' WHERE field_id = 'visitType';
UPDATE specialty_fields SET options = '["Normal", "Decreased", "Increased", "Not eating"]' WHERE field_id = 'appetite';
UPDATE specialty_fields SET options = '["Normal", "Trouble falling asleep", "Waking frequently", "Sleeping more than usual"]' WHERE field_id = 'sleepPattern';

-- =============================================
-- VERIFICATION QUERIES
-- =============================================

-- Verify doctors count
-- SELECT COUNT(*) as doctor_count FROM doctors;

-- Verify schedules
-- SELECT d.name, COUNT(s.id) as schedule_days FROM doctors d LEFT JOIN schedules s ON d.id = s.doctor_id GROUP BY d.id, d.name;

-- Verify specialty fields
-- SELECT specialty, COUNT(*) as field_count FROM specialty_fields GROUP BY specialty ORDER BY specialty;

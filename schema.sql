-- Create Cappivate AI database
CREATE DATABASE cappivate_ai;

-- Create linked_accounts table to store user social media links
CREATE TABLE linked_accounts (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    platform VARCHAR(50) NOT NULL,
    profile_url TEXT NOT NULL
);

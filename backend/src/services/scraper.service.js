import axios from 'axios';
import * as cheerio from 'cheerio';
import { Story } from '../models/story.model.js';
import https from 'https';

/**
 * Scrapes top 10 stories from Hacker News and stores them in MongoDB
 */
export const scrapeHackerNews = async () => {
    try {
        console.log('Starting scraper...');

        // Fetch HTML from Hacker News
        const { data } = await axios.get('https://news.ycombinator.com/', {
            timeout: 10000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            },
            httpsAgent: new https.Agent({ keepAlive: true })
        });

        const $ = cheerio.load(data);
        const stories = [];

        // HN structure: .athing contains the rank and titleline
        $('.athing').slice(0, 10).each((index, element) => {
            const hnId = $(element).attr('id');
            const titleElement = $(element).find('.titleline > a');
            const title = titleElement.text();
            const url = titleElement.attr('href');

            // The next sibling <tr> contains the points, author, and time
            const subtext = $(element).next();
            const points = parseInt(subtext.find('.score').text()) || 0;
            const author = subtext.find('.hnuser').text() || 'Anonymous';
            const postedAt = subtext.find('.age').attr('title') || subtext.find('.age').text();

            if (title && url) {
                stories.push({
                    hnId,
                    title,
                    url,
                    points,
                    author,
                    postedAt
                });
            }
        });

        console.log(`Parsed ${stories.length} stories. Saving to DB...`);

        // Upsert stories (Update if exists, Insert if new) based on hnId
        const savePromises = stories.map(story =>
            Story.findOneAndUpdate(
                { hnId: story.hnId },
                story,
                { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
            )
        );

        await Promise.all(savePromises);
        console.log(`Successfully scraped and updated ${stories.length} stories.`);
        return stories;
    } catch (error) {
        console.error('Scraping error details:', error.message);
        throw error;
    }
};
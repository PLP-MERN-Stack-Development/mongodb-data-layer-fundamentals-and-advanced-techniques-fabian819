

const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017';
const dbName = 'plp_bookstore';
const collName = 'books';

async function main() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const books = db.collection(collName);

    // Task 2
    console.log('All fiction books:');
    console.log(await books.find({ genre: 'Fiction' }).toArray());

    console.log('Books published after 1950:');
    console.log(await books.find({ published_year: { $gt: 1950 } }).toArray());

    console.log('Books by Aldous Huxley:');
    console.log(await books.find({ author: 'Aldous Huxley' }).toArray());

    console.log('Update price of "Pride and Prejudice":');
    console.log(await books.updateOne({ title: 'Pride and Prejudice' }, { $set: { price: 10.99 } }));

    console.log('Delete "The Lord of the Rings":');
    console.log(await books.deleteOne({ title: 'The Lord of the Rings' }));

    // Task 3 
    console.log('In-stock & published after 2010:');
    console.log(await books.find({ in_stock: true, published_year: { $gt: 2010 } }).toArray());

    console.log('Projection (title, author, price):');
    console.log(await books.find({}, { projection: { title: 1, author: 1, price: 1, _id: 0 } }).toArray());

    console.log('Sort by price ascending:');
    console.log(await books.find().sort({ price: 1 }).toArray());

    console.log('Sort by price descending:');
    console.log(await books.find().sort({ price: -1 }).toArray());

    console.log('Pagination (page 1, 5 per page):');
    console.log(await books.find().skip(0).limit(5).toArray());

    // Task 4
    console.log('Average price by genre:');
    console.log(await books.aggregate([
      { $group: { _id: '$genre', avgPrice: { $avg: '$price' }, count: { $sum: 1 } } },
      { $project: { _id: 0, genre: '$_id', avgPrice: { $round: ['$avgPrice', 2] }, count: 1 } },
      { $sort: { avgPrice: -1 } }
    ]).toArray());

    console.log('Author with the most books:');
    console.log(await books.aggregate([
      { $group: { _id: '$author', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 },
      { $project: { _id: 0, author: '$_id', count: 1 } }
    ]).toArray());

    console.log('Books count by publication decade:');
    console.log(await books.aggregate([
      { $match: { published_year: { $type: 'number' } } },
      { $project: { decade: { $multiply: [ { $floor: { $divide: ['$published_year', 10] } }, 10 ] } } },
      { $group: { _id: '$decade', count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
      { $project: { _id: 0, decade: { $concat: [ { $toString: '$_id' }, 's' ] }, count: 1 } }
    ]).toArray());

    // Task 5
    console.log('Create index on title (unique if titles are unique in your dataset):');
    try {
      console.log(await books.createIndex({ title: 1 }, { unique: true, background: true }));
    } catch (err) {
      console.error('Index creation error (possible duplicates):', err.message);
    }

    console.log('Create compound index on author + published_year:');
    console.log(await books.createIndex({ author: 1, published_year: -1 }));

    console.log('Current indexes:');
    console.log(await books.indexes());

    console.log('Bulk write examples (updateMany, insertOne, deleteOne):');
    const bulkOps = [
      {
        updateMany: {
          filter: { in_stock: { $exists: false } },
          update: { $set: { in_stock: false } }
        }
      },
      {
        insertOne: {
          document: {
            title: 'Example Bulk Insert Book',
            author: 'Bulk Author',
            genre: 'Example',
            price: 9.99,
            published_year: 2025,
            in_stock: true
          }
        }
      },
      {
        deleteOne: {
          filter: { title: 'Temporary Remove Me' } // safe no-op if not present
        }
      }
    ];
    console.log(await books.bulkWrite(bulkOps));

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

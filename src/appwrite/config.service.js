import { Client, Databases, ID, Query, Storage } from 'appwrite';
import envVariables from '../config/config.env';

export class Service {
  client = Client();
  databases;
  bucket;
  constructor() {
    this.client = client
      .setEndpoint(envVariables.appwriteUrl)
      .setProject(envVariables.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }
  async createPost({ slug, title, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        envVariables.appwriteDatabaseId,
        envVariables.appwriteCollectionId,
        slug,
        { slug, title, content, featuredImage, status, userId }
      );
    } catch (error) {
      console.log('Appwrite serive :: createPost :: error', error);
    }
  }
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        envVariables.appwriteDatabaseId,
        envVariables.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log('Appwrite serive :: updatePost :: error', error);
    }
  }
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        envVariables.appwriteDatabaseId,
        envVariables.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log('Appwrite serive :: deletePost :: error', error);
      return false;
    }
  }
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        envVariables.appwriteDatabaseId,
        envVariables.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log('Appwrite serive :: getPost :: error', error);
      return false;
    }
  }
  async getPosts(queries = [Query.equal('status', 'active')]) {
    try {
      return await this.databases.listDocuments(
        envVariables.appwriteDatabaseId,
        envVariables.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log('Appwrite serive :: getPosts :: error', error);
      return false;
    }
  }
  //   file upload service
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        envVariables.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log('Appwrite serive :: uploadFile :: error', error);
      return false;
    }
  }
  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile(
        envVariables.appwriteBucketId,
        fileId
      );
    } catch (error) {
      return false;
    }
  }
  getFilePreview(fileId) {
    try {
      return this.bucket.getFilePreview(envVariables.appwriteBucketId, fileId);
    } catch (error) {
      console.log('Appwrite serive :: getFilePreview :: error', error);
      return false;
    }
  }
}

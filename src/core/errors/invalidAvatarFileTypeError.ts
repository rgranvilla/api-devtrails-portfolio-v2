export class InvalidAvatarFileTypeError extends Error {
  constructor() {
    super(
      'The file type is invalid. Please ensure the file is either in JPEG, PNG, Webp format.',
    );
  }
}

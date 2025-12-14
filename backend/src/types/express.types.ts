import type { Request } from 'express';
import type { JwtPayload } from '../utils/jwt.util';

/**
 * Augment Express namespace to override the default User type
 */
declare global {
    namespace Express {
        // Override the default User interface to match JWT payload structure
        interface User extends JwtPayload { }
    }
}

// Ensure this file is treated as a module
export { };

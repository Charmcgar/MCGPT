// collisions.js

// Enhanced collision detection function
function checkCollision(position, direction, blocks) {
    // Check for collisions in the direction of movement
    for (let chunk of blocks.values()) {
        for (let block of chunk) {
            if (block.userData.solid) {
                const distance = position.distanceTo(block.position);
                if (distance < 0.6) {
                    if (direction.y < 0 && position.y > block.position.y) { // Falling down
                        position.y = block.position.y + 0.6; // Stand on top of the block
                        return { collided: true, canJump: true };
                    }
                    return { collided: true, canJump: false };
                }
            }
        }
    }
    return { collided: false, canJump: false };
}

// Export the collision function
export { checkCollision };

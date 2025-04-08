
function checkCollision(position, direction, blocks) {
    for (let chunk of blocks.values()) {
        for (let block of chunk) {
            if (block.userData.solid) {
                const distance = position.distanceTo(block.position);
                if (distance < 0.6) {
                    if (direction.y < 0 && position.y > block.position.y) { 
                        position.y = block.position.y + 0.6; 
                        return { collided: true, canJump: true };
                    }
                    return { collided: true, canJump: false };
                }
            }
        }
    }
    return { collided: false, canJump: false };
}

export { checkCollision };

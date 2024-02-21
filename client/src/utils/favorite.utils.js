const favoriteUtils = {
    check: ({ listFavorites, mediaId }) => 
        Array.isArray(listFavorites) &&
        mediaId !== undefined &&
        listFavorites.find(e => e.mediaId && e.mediaId.toString() === mediaId.toString()) !== undefined
};

export default favoriteUtils;

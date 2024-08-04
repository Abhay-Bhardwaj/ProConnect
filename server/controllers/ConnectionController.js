import ConnectionRequest from '../models/ConnectionRequestModel.js';
import User from '../models/UserModel.js';

export const sendConnectionRequest = async (req, res) => {
  try {
    const { receiverId } = req.body;
    const senderId = req.userId;

    const existingRequest = await ConnectionRequest.findOne({ sender: senderId, receiver: receiverId });
    if (existingRequest) {
      return res.status(400).send('Connection request already sent');
    }
    await User.findById({ _id: senderId },{$push:{following:receiverId}});

    const newRequest = await ConnectionRequest.create({ sender: senderId, receiver: receiverId });
    return res.status(201).json(newRequest);
  } catch (err) {
    console.log('Error:', err.message);
    return res.status(500).send('Internal Server Error: ' + err.message);
  }
};

export const acceptConnectionRequest = async (req, res) => {
  try {
    const { requestId } = req.body;
    const request = await ConnectionRequest.findById(requestId);

    if (!request) {
      return res.status(404).send('Connection request not found');
    }

    request.status = 'accepted';
    await request.save();

    // Add each user to the other's connections list
    await User.updateOne({ _id: request.sender }, { $push: { following: request.receiver } });
    await User.updateOne({ _id: request.receiver }, { $push: { following: request.sender } });

    return res.status(200).json(request);
  } catch (err) {
    console.log('Error:', err.message);
    return res.status(500).send('Internal Server Error: ' + err.message);
  }
};

export const declineConnectionRequest = async (req, res) => {
  try {
    const {requestId} = req.body;
    const request = await ConnectionRequest.findById(requestId);

    if (!request) {
      return res.status(404).send('Connection request not found');
    }

    request.status = 'declined';
    await request.save();

    return res.status(200).json(request);
  } catch (err) {
    console.log('Error:', err.message);
    return res.status(500).send('Internal Server Error: ' + err.message);
  }
};

export const listConnections = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).populate('following', 'userName email firstName lastName image');

    if (!user) {
      return res.status(404).send('User not found');
    }

    return res.status(200).json(user.following);
  } catch (err) {
    console.log('Error:', err.message);
    return res.status(500).send('Internal Server Error: ' + err.message);
  }
};


export const followUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
  
    if (user.following.includes(id)) {
      return res.status(400).send('Already following');
    }

    await User.updateOne({ _id: userId }, { $push: { following: id } });
    await User.updateOne({ _id: id }, { $push: { followers: userId } });
    return res.status(200).send('Following');
  }catch(err){
    console.log('Error at followUser Controller:', err.message);
    return res.status(500).send('Internal Server Error: ' + err.message);
  }
}

export const unfollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    if (!user.following.includes(id)) {
      return res.status(400).send('Not following');
    }

    await User.updateOne({ _id: userId }, { $pull: { following: id } });
    await User.updateOne({ _id: id }, { $pull: { followers: userId } });
    return res.status(200).send('Unfollowed');
  }catch(err){
    console.log('Error at unfollowUser Controller:', err.message);
    return res.status(500).send('Internal Server Error: ' + err.message);
  }
}
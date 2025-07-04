import { packageAddress, suiClient, walrusClient } from './config';
import { Transaction } from '@mysten/sui/transactions';

type funcTypes = 'create-profile'

//A higher order funtion that takes in arguements and constructs a movecall PTB
export const buildPTB = async (args: Array<any>, func: funcTypes) => {
    const tx = new Transaction()
    tx.moveCall({
        target: `${packageAddress}::${func}`,
        arguments:args
    })
    return tx
}

//moving the function to the profile form component because of the need for the allet hook

/**
 
export const uploadImageToWalrus = async (file: File, address: string) => {
    try{
        const bytesFile = await file.bytes()
        
        // const { blobId } = await walrusClient.writeBlob({
        //     blob: bytesFile,
        //     deletable: false,
        //     epochs: 2,
        //     signer
        // })
		
        // const url = `https://storage.testnet.walrus.space/v1/blob/${blobId}`;
        // return url;
		const encoded = await walrusClient.encodeBlob(bytesFile);
		
		const registerBlobTransaction = walrusClient.registerBlobTransaction({
			blobId: encoded.blobId,
			rootHash: encoded.rootHash,
			size: bytesFile.length,
			deletable: true,
			epochs: 3,
			owner: address,
		});
		registerBlobTransaction.setSender(address);
		
		const { digest } = await signAndExecuteTransaction({ transaction: registerBlobTransaction });

		const { objectChanges, effects } = await suiClient.waitForTransaction({
			digest,
			options: { showObjectChanges: true, showEffects: true },
		});

		if (effects?.status.status !== 'success') {
			throw new Error('Failed to register blob');
		}

		const blobType = await walrusClient.getBlobType();

		const blobObject = objectChanges?.find(
			(change) => change.type === 'created' && change.objectType === blobType,
		);
		
		if (!blobObject || blobObject.type !== 'created') {
			throw new Error('Blob object not found');
		}
		
		const confirmations = await walrusClient.writeEncodedBlobToNodes({
			blobId: encoded.blobId,
			metadata: encoded.metadata,
			sliversByNode: encoded.sliversByNode,
			deletable: true,
			objectId: blobObject.objectId,
		});
		
		const certifyBlobTransaction = walrusClient.certifyBlobTransaction({
			blobId: encoded.blobId,
			blobObjectId: blobObject.objectId,
			confirmations,
			deletable: true,
		});
		certifyBlobTransaction.setSender(address);
		
		const { digest: certifyDigest } = await signAndExecuteTransaction({
			transaction: certifyBlobTransaction,
		});
		
		const { effects: certifyEffects } = await suiClient.waitForTransaction({
			digest: certifyDigest,
			options: { showEffects: true },
		});

		if (certifyEffects?.status.status !== 'success') {
			throw new Error('Failed to certify blob');
		}
		
		return encoded.blobId;
    } catch(error){
        console.error(error)
    }
}
*/
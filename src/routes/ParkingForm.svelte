<script>
	import Fa from 'svelte-fa';
	import { faX, faCircleXmark, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
	import { getContext, createEventDispatcher } from 'svelte';
	export let parkingSpace;
	export let parking_space_availability_id;
	export let hasForm = false;
	export let onCancel = () => {};
	export let onOkay = () => {};

	const { close } = getContext('simple-modal');
	const dispatch = createEventDispatcher();

	let claimant_name = '';
	let onChange = () => {};

	function _onCancel() {
		onCancel();
		close();
	}

	async function _onOkay() {
		onOkay();
		const res = await fetch('/claims/save', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				parking_space_availability_id: parking_space_availability_id,
				claimant_name: claimant_name
			})
		});
		let result = await res.json();
		dispatch('parkingUpdated');
		close();
	}

	$: onChange(claimant_name);
</script>

<div class="rounded p-2 bg-{parkingSpace.color}-500 px-4 w-96">
	<div class="text-black">
		{parking_space_availability_id}
		{parkingSpace.id}
		{parkingSpace.name}
	</div>

	{#if hasForm}
		<div class="">
			<input type="hidden" bind:value={parkingSpace.id} />
			<input
				type="text"
				bind:value={claimant_name}
				required
				class="form-input px-4 py-3 block w-full bg-black rounded text-white font-bold"
				placeholder="Ditt namn"
			/>
		</div>
	{/if}

	<div class="buttons text-black mt-2 flex gap-1 justify-between">
		<div class="w-14 h-14 flex justify-center rounded bg-black text-red-500">
			<button on:click={_onCancel}><Fa icon={faCircleXmark} size="2x" /></button>
		</div>
		<div class="w-14 h-14 flex justify-center rounded bg-black text-green-500">
			<button on:click={_onOkay}><Fa icon={faCircleCheck} size="2x" /></button>
		</div>
	</div>
</div>

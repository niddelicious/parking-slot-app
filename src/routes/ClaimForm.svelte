<script lang="ts">
	import Fa from 'svelte-fa';
	import { faCircleXmark, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
	import { getContext, createEventDispatcher } from 'svelte';
	import type { ParkingClaim } from './parkingTypes';
	export let hasForm = false;
	export let onCancel: () => void = () => {};
	export let onOkay: () => void = () => {};

	const { close } = getContext('simple-modal');

	let void_name: string | null = null;
	export let claim: ParkingClaim;
	let onChange = () => {};
	const dispatch = createEventDispatcher();

	function _onCancel() {
		onCancel();
		close();
	}

	async function _onOkay() {
		onOkay();
		const res = await fetch('/claims/void', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: claim.id,
				void_name: void_name
			})
		});
		let result = await res.json();
		dispatch('saved', result);
		close();
	}

	$: onChange(void_name);
</script>

<div class="rounded p-2 bg-zinc-500 px-4 w-96">
	<div class="text-white bg-zinc-900 rounded px-4 py-2 mb-2 text-center font-bold">
		Mackulera bokning: {claim.claimant_name}
	</div>

	{#if hasForm}
		<div class="">
			<input type="hidden" bind:value={claim.id} />
			<input
				type="text"
				bind:value={void_name}
				required
				class="form-input px-4 py-3 block w-full bg-black rounded text-white font-bold"
				placeholder="Fyll i samma namn för att makulera"
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
